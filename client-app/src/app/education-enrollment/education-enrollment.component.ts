import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationError, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { isNullOrUndefined, isObject } from 'util';
import swal from 'sweetalert2';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

import { Eeispf, AutofetchEeispf, familyMemeber } from './eeispf';
import { OpencardsService } from '../opecards-list-view/opencards.service';
import { EducationEnrollmentService } from './education-enrollment.service';
import { ClildFormService } from '../child-forms/child-forms.service';
import { CaseTeamService } from '../case-team/case-team.service';
import html2pdf from 'html2pdf.js';
import { environment } from '../../environments/environment';
import { LocalValues } from '../local-values';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-education-enrollment',
  templateUrl: './education-enrollment.component.html',
  styleUrls: ['./education-enrollment.component.scss']
})

export class EducationEnrollmentComponent implements OnInit {
  eeispf: Eeispf = new Eeispf;
  educationEnrollForm: FormGroup;
  xmlDataField: any;
  draftResponseJson: any;
  breadcrumbs = [];
  formStatus = true;
  subtitle: any = '';
  quickMenu = "quickMenu";
  isEdit = false;
  isFinalize = true;
  discardTo = '/reintegration/referral/opencard/school/eeispf/view';
  isUpdate = false;
  checked = true;
  metaData = [];
  allSendEmails = [];
  emailNotifiers: any;
  isEmailConfirmation = false;
  eeispfFormStatus: any;
  autoNavigateUrl: any;
  emailAddressOne: string;
  emailAddressTwo: string;
  emailAddressThree: string;
  emailAddressFour: string;
  isGradeText = false;
  mailFormData: FormData = new FormData();
  eeispfAutoFetch: AutofetchEeispf = new AutofetchEeispf();
  enrollmentDate: any;
  schoolOriginDatesAttended: any;
  previousSchoolDatesAttended: any;
  datesOfPlacement: any;
  educationPlacementDates: any;
  isEmail = false;
  isFinalizeWithDownload = false;
  currentUserId: number;
  referralTypeId: number;
  req = {};
  isFormLog = false;
  formLogInfo = {
    enteredBy: '',
    changedBy: '',
    enteredDate: '',
    changedDate: ''
  }
  schoolOriginDatesAttendedFrom: any;
  schoolOriginDatesAttendedTo: any;
  orgin_usdName: any;
  pre_usdName: any;
  usd_pre_Number: any;
  is_Update = false;
  routerClientID: any;
  routerReferralID: any;
  print_attendees: any;
  print_decisionSummary: any;
  print_studentName: any;
  print_placementAddress: any;
  decisionSummary: any;
  print_fosterCareAddress: any;
  print_eduCoordAddress: any;
  print_supervisorAddress: any;
  print_familySupWorkAddress: any;
  print_familySupportWorkerName: any;
  print_managerAddress: any;
  print_advocateAddress: any;
  print_fatherAddress: any;
  print_fatherAdditionalDetails: any;
  print_placementTelephoneNumbers: any;
  print_schoolOriginAddress: any;
  print_educationPlacementAddress: any;
  print_previousSchoolAddress: any;
  print_explainIfYes: any;
  print_safetyPrecautions: any;
  print_homeCareReasons: any;
  print_currentMedications: any;
  print_healthConditions: any;
  print_otherInformation: any;
  print_addressParent: any;
  print_additionalDetails: any;
  print_placementAddress1: any;
  isUSD_Text = false;
  isOriginUSD_Text: boolean;
  isUSD_orgin_number_Text: boolean;
  isUsdNumberText: boolean;
  isPreUsdNameText: boolean;
  isUSD_number_Text: boolean;
  constructor(public _activateRoute: ActivatedRoute,
    public _opencard: OpencardsService, public _fb: FormBuilder,
    public _educationEnroll: EducationEnrollmentService, public _router: Router, public _client: ClildFormService,
    public _CaseTeamService: CaseTeamService, public _localValues: LocalValues) {
    _router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
        this.autoNavigateUrl = event.url;


      }
    });
    this._activateRoute.queryParams.subscribe(params => {
      if (params && params.clientId) {
        this.routerClientID = parseInt(params.clientId);
      } else {
        this.routerClientID = parseInt(localStorage.getItem("clientId")) -
          this._opencard.getHasKey()
      };
      if (params && params.ref_id) {
        this.routerReferralID = parseInt(params.ref_id);
      } else {
        this.routerReferralID = parseInt(localStorage.getItem("referralId")) -
          this._opencard.getHasKey()
      };
    })

  }

  ngOnInit() {
    this.emailNotifiersAlert();
    this.currentUserId = parseInt(localStorage.getItem('UserId'));
    this.referralTypeId = parseInt(localStorage.getItem('referralTypeId')) - this._opencard.getHasKey();
    this.formValidation();
    if (this._router.url.includes('/reintegration/referral/opencard/school/eeispf/detail')) {
      this.isEmail = true;
      this.readonlyData();
      this.is_Update = true;
      // this.getLastTwoSchoolEmails();

    }
    this.allPlacelists();
    let req = {
      referralID: this.routerReferralID,
      clientID: this.routerClientID
    }
    this._opencard.eeispfEmails(req).then((data: any) => {
      this.all_plaementList = data.placementDetail;
      this.allPlacementLists = data.placementDetail;
    })
    if (this._router.url.includes('/reintegration/referral/opencard/school/eeispf/new')) {
      this.getLastTwoSchoolEmails();
      this.getGrades();
      this.get_medicat_home_hareLists();
      // this.eeispf.isDCF = true;
      // this.redirectSave(this.eeispf);
    }
    this.getEducationEnrolls();
    this.breadcrumbs.push(
      { label: 'List', href: "/reports/client", active: '' },
      { label: 'Form', href: "/reports/client/details", active: '' },
      { label: 'Case Form', href: "/reintegration/referral//detail", active: '' },
      { label: 'School', href: '/reintegration/referral/opencard/school/dashboard' },
      { label: 'Educational Enrollment List', active: '', href: '/reintegration/referral/opencard/school/eeispf/view' },
      { label: 'Educational Enrollment', active: 'active' }
    )
    this.getPreviousEducation();
    // this.getMedicationList();
    // this.getMailList();


    if (this.referralTypeId == 17) { this._localValues.breadcrumbsChanges('eeispf-JJFC', this.breadcrumbs) }
  }

  getRecByRefId() {
    let req = { referralID: this.routerReferralID }
    this._opencard.getEeispfByRefId(req).then((data: any) => {
      this.eeispf = data.educationEntrollment;
    })
  }

  jsonFormation(source) {


    this.xmlDataField = Object.keys(source).map(function (key) {
      return {
        "Value": source[key],
        "FieldName": key
      };
    });

    this.draftResponseJson = {
      pdfDoc: {
        pdfdoc: {
          Header: "",
          XMLData: {
            Field: this.xmlDataField
          }
        }
      }
    }
  }

  formValidation() {
    this.educationEnrollForm = this._fb.group({

      dateStaffed: [null],
      placementAlternative: [null],
      isCwcbip: [false],
      isDCF: [false],
      isSFM: [false],
      isTFI: [false],
      isCustomerCare: [false],
      isKVC: [false],
      islea: [false],
      attendees: [null],
      isLengthOfTime: [false],
      isChildPreference: [false],
      isLearningBehaviors: [false],
      isParentPreference: [false],
      isSafteyFactors: [false],
      isChildAttachment: [false],
      isParticipation: [false],
      isPlacementOfSiblings: [false],
      isDistanceFormSchool: [false],
      isInfluenceOfSchoolClimate: [false],
      isIFPAnd504: [false],
      isAvailability: [false],
      isWrittenInput: [false],
      isCaregiverRequires: [false],
      other: [false],
      decisionSummary: [null],
      date: [null],
      responsibelStateAgency: [null],
      isDCF1: [false],
      isKDOCJS: [false],
      authorizedBy: [null],
      schoolOriginDatesAttendedTo: [null],
      schoolOriginDatesAttendedFrom: [null],
      studentName: [null],
      dob: [null],
      ssn: [null],
      isPhone: [false],
      phone: [null],
      isemail: [false],
      email: [null],
      placementNames: [null],
      placementAddress: [null],
      placementTelephoneNumbers: [null],
      placementEmailAddress: [null],
      usdName: [null],
      usdNumber: [null],
      schoolName: [null],
      schoolAddress: [null],
      schoolPhone: [null],
      schoolMailORFax: [null],
      schoolBuildEmail: [null],
      schoolbuildName: [null],
      school2BuildEmail: [null],
      school2buildName: [null],
      school3BuildEmail: [null],
      school3buildName: [null],
      school1Fax: [null],
      schoolFax: [null],
      essa: [null],
      essa1_phoneNumber: [null],
      essa1_email: [null],
      essa2_email: [null],
      phoneNoOREmail: [null],
      enrollmentDate: [null],
      grade: [null],
      gradeText: [null],
      regularEducation: [null],
      isSpecialEducation: [false],
      alternativeSchool: [null],
      onlineLearning: [null],
      isSchoolOfOriginName: [false],
      schoolOriginName: [null],
      schoolOriginAddress: [null],
      schoolOriginPhone: [null],
      schoolOriginESSA: [null],
      schoolOriginPhoneOREmail: [null],
      schoolOriginDatesAttended: [null],
      isSchoolOrigin: [false],
      isSpecialEducation1: [false],
      isSchoolOriginAlternativeSchool: [false],
      isSchoolOrginOnlineLearning: [false],
      placementName: [null],
      datesOfPlacement: [null],
      placementAddress1: [null],
      placementPhone: [null],
      placementEmail: [null],
      placementAlternate: [null],
      isPreviousSchoolName: [false],
      previousSchoolName: [null],
      previousSchoolAddress: [null],
      previousSchoolFaxOrEmail: [null],
      previousSchoolEmail: [null],
      previousSchoolFax: [null],
      previousSchoolESSA: [null],
      previousSchoolDatesAttended: [null],
      pre_schoolOriginDatesAttendedTo: [null],
      pre_schoolOriginDatesAttendedFrom: [null],
      isPreviousSchoolRegularEducation: [false],
      isPreviousSchoolSpecialEducation: [false],
      isPreviousSchoolAlternativeSchool: [false],
      isPreviousSchoolOnlineLearning: [false],
      educationPlacementName: [null],
      educationPlacementDates: [null],
      educationPlacementAddress: [null],
      edcautionPlacementPhone: [null],
      educationEmail: [null],
      educationAlternativeContact: [null],
      isIEPYES: [false],
      isIEPNO: [false],
      isEvaluationInProgress: [false],
      isIEPUnkown: [false],
      isIEP504YES: [false],
      isIEP504NO: [false],
      isIEPUnkown1: [false],
      isIEPschoolYES: [false],
      isIEPschoolNo: [false],
      isIEPschoolUnknown: [false],
      isIEPsuspendYES: [false],
      isIEPsuspendNo: [false],
      suspendedDate: [null],
      suspendedLength: [null],
      isStudentExpelledYes: [false],
      isStudentExpelledNo: [false],
      studentExpelledDate: [null],
      studentExpelledLength: [null],
      explainIfYes: [null],
      safetyPrecautions: [null],
      homeCareReasons: [null],
      currentMedications: [null],
      healthConditions: [null],
      otherInformation: [null],
      motherName: [null],
      addressParent: [null],
      phoneNoParent: [null],
      emailParent: [null],
      contactParent: [null],
      isRestrictionContactedYes: [false],
      isRestrictionContactedNo: [false],
      isRightsTerminatedYes: [false],
      isRightsTerminatedNo: [false],
      additionalDetails: [null],
      fatherName: [null],
      fatherAddress: [null],
      fatherPhoneNumber: [null],
      fatherEmail: [null],
      alternateFatherContact: [null],
      isFatherRestrictedYes: [false],
      isFatherRestrictedNo: [false],
      isFatherRightsTerminatedYes: [false],
      isFatherRightsTerminatedNo: [false],
      fatherAdditionalDetails: [null],
      advocateName: [null],
      advocateAddress: [null],
      advocatePhone: [null],
      advocateEmail: [null],
      advocateAlternateContact: [null],
      managerName: [null],
      managerAddress: [null],
      managerPhone: [null],
      managerOfficePhone: [null],
      managerOfficePhone_extension: [null],
      eduCoordOfficePhone_extension: [null],
      supervisorOfficePhone_extension: [null],
      fosterCareOfficePhone_extension: [null],
      familySupWorkOfficePhone_extension: [null],
      managerEmail: [null],
      managerFax: [null],
      supervisorName: [null],
      supervisorPhone: [null],
      supervisorAddress: [null],
      supervisorOfficePhone: [null],
      supervisorEmail: [null],
      supervisorFax: [null],
      fosterCareName: [null],
      fosterCareAddress: [null],
      fosterCarePhone: [null],
      fosterCareOfficePhone: [null],
      fosterCareEmail: [null],
      fosterCareFax: [null],
      administratorName: [null],
      administratorAddress: [null],
      administratorPhone: [null],
      administratorOfficePhone: [null],
      administratorEmail: [null],
      administratorFax: [null],
      participateInStaffing: [null],
      previousSchoolPhoneNumber: [null],
      previousSchoolESSAPhoneNumber: [null],
      schoolFaxEmail: [null],
      isPhoneEnable: [false],
      isemailEnable: [false],
      isSchoolOfOriginNameEnable: [false],
      isPreviousSchoolNameEnable: [false],
      isAdvocateName: [false],
      isAdvInprogress: [false],
      isDecisionMakerYes: [false],
      isDecisionMakerNo: [false],
      familySupWorkAddress: [null],
      familySupWorkPhone: [null],
      familySupWorkOfficePhone: [null],
      familySupWorkEmail: [null],
      familySupWorkFax: [null],
      eduCoordName: [null],
      eduCoordAddress: [null],
      eduCoordPhone: [null],
      eduCoordOfficePhone: [null],
      eduCoordEmail: [null],
      eduCoordFax: [null],
      dcfFostName: [null],
      dcfFostAddress: [null],
      dcfFostPhone: [null],
      dcfFostOfficePhone: [null],
      dcfFostEmail: [null],
      dcfFostFax: [null],
      DOPBeginDate: [null],
      p_DOPBeginDate: [null],
      DOPEndDate: [null],
      p_DOPEndDate: [null],
      orgin_usdName: [null],
      Usd_Orgin_Number: [null],
      pre_usdName: [null],
      usd_pre_Number: [null],
      familySupportWorkerName: [null],
      sixth_conta_cellPhone: [null],
      sixth_conta_email: [null],
      sixth_conta_fax: [null],
      sixth_conta_fullAddress: [null],
      sixth_conta_workPhone: [null],
      sixth_conta_fullName: [null],
      sixth_conta_extension: [null],
    });
  }
  isRedirect = true;
  saveForm(source) {
    this.isRedirect = false;
    source.clientID = this.routerClientID;
    // !isNullOrUndefined(source.dateStaffed) ? source.dateStaffed = Date.parse(source.dateStaffed) : null;
    !isNullOrUndefined(source.dateStaffed) ? source.dateStaffed = this._localValues.stringFormatDatetime(source.dateStaffed) : null;
    !isNullOrUndefined(source.dateStaffed1) ? source.dateStaffed1 = this._localValues.stringFormatDatetime(source.dateStaffed1) : null;
    !isNullOrUndefined(source.dateStaffed2) ? source.dateStaffed2 = this._localValues.stringFormatDatetime(source.dateStaffed2) : null;

    !isNullOrUndefined(source.DOPBeginDate) ? source.DOPBeginDate = this._localValues.stringFormatDatetime(Date.parse(source.DOPBeginDate)) : null;
    !isNullOrUndefined(source.DOPEndDate) ? source.DOPEndDate = this._localValues.stringFormatDatetime(Date.parse(source.DOPEndDate)) : null;
    !isNullOrUndefined(source.p_DOPEndDate) ? source.p_DOPEndDate = this._localValues.stringFormatDatetime(Date.parse(source.p_DOPEndDate)) : null;
    !isNullOrUndefined(source.p_DOPBeginDate) ? source.p_DOPBeginDate = this._localValues.stringFormatDatetime(Date.parse(source.p_DOPBeginDate)) : null;

    !isNullOrUndefined(source.schoolOriginDatesAttendedFrom) ? source.schoolOriginDatesAttendedFrom = this._localValues.stringFormatDatetime(Date.parse(source.schoolOriginDatesAttendedFrom)) : null;
    !isNullOrUndefined(source.schoolOriginDatesAttendedTo) ? source.schoolOriginDatesAttendedTo = this._localValues.stringFormatDatetime(Date.parse(source.schoolOriginDatesAttendedTo)) : null;
    !isNullOrUndefined(source.pre_schoolOriginDatesAttendedFrom) ? source.pre_schoolOriginDatesAttendedFrom = this._localValues.stringFormatDatetime(Date.parse(source.pre_schoolOriginDatesAttendedFrom)) : null;
    !isNullOrUndefined(source.pre_schoolOriginDatesAttendedTo) ? source.pre_schoolOriginDatesAttendedTo = this._localValues.stringFormatDatetime(Date.parse(source.pre_schoolOriginDatesAttendedTo)) : null;

    !isNullOrUndefined(source.dob) ? source.dob = this._localValues.stringFormatDatetime(Date.parse(source.dob)) : null;
    !isNullOrUndefined(source.date) ? source.date = this._localValues.stringFormatDatetime(Date.parse(source.date)) : null;


    !isNullOrUndefined(source.enrollmentDate) ? source.enrollmentDate = this._localValues.stringFormatDatetime(Date.parse(source.enrollmentDate)) : null;
    !isNullOrUndefined(source.datesOfPlacement) ? source.datesOfPlacement = this._localValues.stringFormatDatetime(Date.parse(source.datesOfPlacement)) : null;
    !isNullOrUndefined(source.educationPlacementDates) ? source.educationPlacementDates = this._localValues.stringFormatDatetime(Date.parse(source.educationPlacementDates)) : null;
    !isNullOrUndefined(source.suspendedDate) ? source.suspendedDate = this._localValues.stringFormatDatetime(Date.parse(source.suspendedDate)) : null;
    !isNullOrUndefined(source.studentExpelledDate) ? source.studentExpelledDate = this._localValues.stringFormatDatetime(Date.parse(source.studentExpelledDate)) : null;
    !isNullOrUndefined(source.schoolOriginDatesAttended) ? source.schoolOriginDatesAttended = this._localValues.stringFormatDatetime(Date.parse(source.schoolOriginDatesAttended)) : null;
    !isNullOrUndefined(source.previousSchoolDatesAttended) ? source.previousSchoolDatesAttended = this._localValues.stringFormatDatetime(Date.parse(source.previousSchoolDatesAttended)) : null;

    this.jsonFormation(source);

    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';

    let referralId = this.routerReferralID;

    let saveReq = {
      jsonData: JSON.stringify(source),
      referralID: referralId,

    }
    let updateReq = {
      pdfdocID: this.redirectPdfDocID,
      jsonData: JSON.stringify(source),
      referralID: referralId
    }

    if (this.eeispf.isIEPYES) {
      saveReq['specialEducation'] = true;
      updateReq['specialEducation'] = true;
      updateReq['staffID'] = this.currentUserId || 4620;
      saveReq['staffID'] = this.currentUserId || 4620;
    }

    if (this.eeispf.isIEP504YES) {
      saveReq['generalEducation'] = true;
      updateReq['generalEducation'] = true;
      updateReq['staffID'] = this.currentUserId || 4620;
      saveReq['staffID'] = this.currentUserId || 4620;
    }

    if (this.isUpdate) {
      this._educationEnroll.updateDraft(updateReq).then((data) => {
        loader.style.display = 'none';
        swal('Updated', data.responseMessage, 'success');
        return this._router.navigate(['/reintegration/referral/opencard/school/eeispf/view'], {
          queryParamsHandling: "preserve",
        })
      }).catch((error) => {

      })
    }
    else {
      this._educationEnroll.saveDraft(saveReq).then((data) => {
        loader.style.display = 'none';
        swal('Saved', data.responseMessage, 'success');
        return this._router.navigate(['/reintegration/referral/opencard/school/eeispf/view'], {
          queryParamsHandling: "preserve",
        })
      }).catch((error) => {

      })
    }



  }
  redirectPdfDocID: any;
  redirectSave(source) {
    source.clientID = this.routerClientID;
    // !isNullOrUndefined(source.dateStaffed) ? source.dateStaffed = this._localValues.stringFormatDatetime(source.dateStaffed) : null;
    // !isNullOrUndefined(source.dateStaffed1) ? source.dateStaffed1 = this._localValues.stringFormatDatetime(source.dateStaffed1) : null;
    // !isNullOrUndefined(source.dateStaffed2) ? source.dateStaffed2 = this._localValues.stringFormatDatetime(source.dateStaffed2) : null;
    // !isNullOrUndefined(source.schoolOriginDatesAttendedFrom) ? source.schoolOriginDatesAttendedFrom = this._localValues.stringFormatDatetime(Date.parse(source.schoolOriginDatesAttendedFrom)) : null;
    // !isNullOrUndefined(source.schoolOriginDatesAttendedTo) ? source.schoolOriginDatesAttendedTo = this._localValues.stringFormatDatetime(Date.parse(source.schoolOriginDatesAttendedTo)) : null;
    // !isNullOrUndefined(source.pre_schoolOriginDatesAttendedFrom) ? source.pre_schoolOriginDatesAttendedFrom = this._localValues.stringFormatDatetime(Date.parse(source.pre_schoolOriginDatesAttendedFrom)) : null;
    // !isNullOrUndefined(source.pre_schoolOriginDatesAttendedTo) ? source.pre_schoolOriginDatesAttendedTo = this._localValues.stringFormatDatetime(Date.parse(source.pre_schoolOriginDatesAttendedTo)) : null;

    // !isNullOrUndefined(source.dob) ? source.dob = this._localValues.stringFormatDatetime(Date.parse(source.dob)) : null;
    // !isNullOrUndefined(source.date) ? source.date = this._localValues.stringFormatDatetime(Date.parse(source.date)) : null;
    delete source.enrollmentDate;
    delete source.datesOfPlacement;
    delete source.educationPlacementDates;
    delete source.suspendedDate;
    delete source.studentExpelledDate;
    delete source.schoolOriginDatesAttended;
    delete source.previousSchoolDatesAttended;

    delete source.date;
    delete source.dob;
    delete source.pre_schoolOriginDatesAttendedTo;
    delete source.pre_schoolOriginDatesAttendedFrom;
    delete source.schoolOriginDatesAttendedTo;
    delete source.schoolOriginDatesAttendedFrom;
    delete source.DOPBeginDate;
    delete source.DOPEndDate;
    delete source.p_DOPEndDate;
    // !isNullOrUndefined(source.enrollmentDate) ? source.enrollmentDate = this._localValues.stringFormatDatetime(Date.parse(source.enrollmentDate)) : null;
    // !isNullOrUndefined(source.datesOfPlacement) ? source.datesOfPlacement = this._localValues.stringFormatDatetime(Date.parse(source.datesOfPlacement)) : null;
    // !isNullOrUndefined(source.educationPlacementDates) ? source.educationPlacementDates = this._localValues.stringFormatDatetime(Date.parse(source.educationPlacementDates)) : null;
    // !isNullOrUndefined(source.suspendedDate) ? source.suspendedDate = this._localValues.stringFormatDatetime(Date.parse(source.suspendedDate)) : null;
    // !isNullOrUndefined(source.studentExpelledDate) ? source.studentExpelledDate = this._localValues.stringFormatDatetime(Date.parse(source.studentExpelledDate)) : null;
    // !isNullOrUndefined(source.schoolOriginDatesAttended) ? source.schoolOriginDatesAttended = this._localValues.stringFormatDatetime(Date.parse(source.schoolOriginDatesAttended)) : null;
    // !isNullOrUndefined(source.previousSchoolDatesAttended) ? source.previousSchoolDatesAttended = this._localValues.stringFormatDatetime(Date.parse(source.previousSchoolDatesAttended)) : null;

    this.jsonFormation(source);
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let referralId = this.routerReferralID;
    let saveReq = {
      jsonData: JSON.stringify(source),
      referralID: referralId,
    }
    if (this.eeispf.isIEPYES) {
      saveReq['specialEducation'] = true;
      saveReq['staffID'] = this.currentUserId || 4620;
    }

    if (this.eeispf.isIEP504YES) {
      saveReq['generalEducation'] = true;
      saveReq['staffID'] = this.currentUserId || 4620;
    }

    this._educationEnroll.saveDraft(saveReq).then((data) => {
      loader.style.display = 'none';
      this.redirectPdfDocID = data.pdfdocID;
      this.getLastTwoSchoolEmails();
      // this.eeispf.dob = new Date(source.dob);
      // this.eeispf.date = new Date(source.date);

      // !isNullOrUndefined(source.enrollmentDate)
      //   ? (this.eeispf.enrollmentDate = new Date(source.enrollmentDate))
      //   : null;
      // !isNullOrUndefined(source.datesOfPlacement)
      //   ? (this.eeispf.datesOfPlacement = new Date(source.datesOfPlacement))
      //   : null;
      // !isNullOrUndefined(source.educationPlacementDates)
      //   ? (this.eeispf.educationPlacementDates = new Date(
      //     source.educationPlacementDates
      //   ))
      //   : null;
      // !isNullOrUndefined(source.suspendedDate)
      //   ? (this.eeispf.suspendedDate = new Date(source.suspendedDate))
      //   : null;
      // !isNullOrUndefined(source.studentExpelledDate)
      //   ? (this.eeispf.studentExpelledDate = new Date(
      //     source.studentExpelledDate
      //   ))
      //   : null;
      // !isNullOrUndefined(source.schoolOriginDatesAttended)
      //   ? (this.eeispf.schoolOriginDatesAttended = new Date(
      //     source.schoolOriginDatesAttended
      //   ))
      //   : null;



      this.isUpdate = true;
    }).catch((error) => {

    })
  };


  redirectUpdate(source) {
    source.clientID = this.routerClientID;
    // !isNullOrUndefined(source.dateStaffed) ? source.dateStaffed = Date.parse(source.dateStaffed) : null;
    !isNullOrUndefined(source.dateStaffed) ? source.dateStaffed = this._localValues.stringFormatDatetime(source.dateStaffed) : null;
    !isNullOrUndefined(source.dateStaffed1) ? source.dateStaffed1 = this._localValues.stringFormatDatetime(source.dateStaffed1) : null;
    !isNullOrUndefined(source.dateStaffed2) ? source.dateStaffed2 = this._localValues.stringFormatDatetime(source.dateStaffed2) : null;

    !isNullOrUndefined(source.DOPBeginDate) ? source.DOPBeginDate = this._localValues.stringFormatDatetime(Date.parse(source.DOPBeginDate)) : null;
    !isNullOrUndefined(source.DOPEndDate) ? source.DOPEndDate = this._localValues.stringFormatDatetime(Date.parse(source.DOPEndDate)) : null;
    !isNullOrUndefined(source.p_DOPEndDate) ? source.p_DOPEndDate = this._localValues.stringFormatDatetime(Date.parse(source.p_DOPEndDate)) : null;
    !isNullOrUndefined(source.p_DOPBeginDate) ? source.p_DOPBeginDate = this._localValues.stringFormatDatetime(Date.parse(source.p_DOPBeginDate)) : null;


    !isNullOrUndefined(source.schoolOriginDatesAttendedFrom) ? source.schoolOriginDatesAttendedFrom = this._localValues.stringFormatDatetime(Date.parse(source.schoolOriginDatesAttendedFrom)) : null;
    !isNullOrUndefined(source.schoolOriginDatesAttendedTo) ? source.schoolOriginDatesAttendedTo = this._localValues.stringFormatDatetime(Date.parse(source.schoolOriginDatesAttendedTo)) : null;
    !isNullOrUndefined(source.pre_schoolOriginDatesAttendedFrom) ? source.pre_schoolOriginDatesAttendedFrom = this._localValues.stringFormatDatetime(Date.parse(source.pre_schoolOriginDatesAttendedFrom)) : null;
    !isNullOrUndefined(source.pre_schoolOriginDatesAttendedTo) ? source.pre_schoolOriginDatesAttendedTo = this._localValues.stringFormatDatetime(Date.parse(source.pre_schoolOriginDatesAttendedTo)) : null;
    !isNullOrUndefined(source.dob) ? source.dob = this._localValues.stringFormatDatetime(Date.parse(source.dob)) : null;
    !isNullOrUndefined(source.date) ? source.date = this._localValues.stringFormatDatetime(Date.parse(source.date)) : null;
    !isNullOrUndefined(source.enrollmentDate) ? source.enrollmentDate = this._localValues.stringFormatDatetime(Date.parse(source.enrollmentDate)) : null;
    !isNullOrUndefined(source.datesOfPlacement) ? source.datesOfPlacement = this._localValues.stringFormatDatetime(Date.parse(source.datesOfPlacement)) : null;
    !isNullOrUndefined(source.educationPlacementDates) ? source.educationPlacementDates = this._localValues.stringFormatDatetime(Date.parse(source.educationPlacementDates)) : null;
    !isNullOrUndefined(source.suspendedDate) ? source.suspendedDate = this._localValues.stringFormatDatetime(Date.parse(source.suspendedDate)) : null;
    !isNullOrUndefined(source.studentExpelledDate) ? source.studentExpelledDate = this._localValues.stringFormatDatetime(Date.parse(source.studentExpelledDate)) : null;
    !isNullOrUndefined(source.schoolOriginDatesAttended) ? source.schoolOriginDatesAttended = this._localValues.stringFormatDatetime(Date.parse(source.schoolOriginDatesAttended)) : null;
    !isNullOrUndefined(source.previousSchoolDatesAttended) ? source.previousSchoolDatesAttended = this._localValues.stringFormatDatetime(Date.parse(source.previousSchoolDatesAttended)) : null;
    this.jsonFormation(source);
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let referralId = this.routerReferralID;

    let updateReq = {
      pdfdocID: this.redirectPdfDocID,
      jsonData: JSON.stringify(source),
      referralID: referralId
    }
    if (this.eeispf.isIEPYES) {
      updateReq['specialEducation'] = true;
      updateReq['staffID'] = this.currentUserId || 4620;
    }

    if (this.eeispf.isIEP504YES) {
      updateReq['generalEducation'] = true;
      updateReq['staffID'] = this.currentUserId || 4620;
    }

    this._educationEnroll.updateDraft(updateReq).then((data) => {
      loader.style.display = 'none';
    }).catch((error) => {

    })
  }



  emailNotifiersAlert() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    let req = { referralID: this.routerReferralID }
    this._opencard.emailNotifiersEsispf(req).then((data: any) => {
      let loader = document.getElementById('loading-overlay') as HTMLElement
      loader.style.display = 'none';
      if (data.responseStatus) {
        this.emailAddressOne = data.educationEntrollmentEmail.ComplianceTech_Email;
        this.emailAddressTwo = data.educationEntrollmentEmail.CaseTeam_ComplianceTech_Email;
      }
    })
  }

  getRecById() {
    const loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.req = { pdfdocID: this._client.getId() }
    this.redirectPdfDocID = this._client.getId();
    this.eeispfFormStatus = this._client.getEsipfFormStatus();
    this._opencard.getEeispfByPdfDocId(this.req).then((data: any) => {
      Object.keys(data.pdfDoc).map(function (key) {
        if (data.pdfDoc[key] === "true") {
          data.pdfDoc[key] = true;
        }
        else if (data.pdfDoc[key] === "false") {
          data.pdfDoc[key] = false;
        } else if (data.pdfDoc[key] === "null" || data.pdfDoc[key] === "null, null, null, null") {
          data.pdfDoc[key] = null;
        } else if (isObject(data.pdfDoc[key])) {
          if (Object.keys(data.pdfDoc[key]).length === 0) {
            data.pdfDoc[key] = null;
          }
        }
      });

      const loader = document.getElementById('loading-overlay') as HTMLElement
      loader.style.display = 'none';
      if (typeof data.pdfDoc.grade === 'string') {
        this.isGradeText = true;
        this.gradeName = data.pdfDoc.grade;
      } else {
        this.gradeName = !isNullOrUndefined(data.pdfDoc.grade) ? data.pdfDoc.grade.grade : null;
      };
      if (typeof data.pdfDoc.placementNames === 'string') {
        this.eeispf.isPlacementNamesText = true;
        this.placementNames = data.pdfDoc.placementName;
      } else {
        this.placementNames = !isNullOrUndefined(data.pdfDoc.placementName) ? data.pdfDoc.placementName.placementName : null;
      }
      if (typeof data.pdfDoc.placementName === 'string') {
        this.eeispf.isPreviousPlacemengText = true;
        this.previous_placementName = data.pdfDoc.placementName;
      } else {
        this.previous_placementName = !isNullOrUndefined(data.pdfDoc.placementName) ? data.pdfDoc.placementName.placementName : null;
      }

      if (typeof data.pdfDoc.educationPlacementName === 'string') {
        this.eeispf.isEDuPlacementNametext = true;
        this.pre_previous_placementName = data.pdfDoc.educationPlacementName;
      } else {
        this.pre_previous_placementName = !isNullOrUndefined(data.pdfDoc.educationPlacementName) ? data.pdfDoc.educationPlacementName.placementName : null;
      }

      if (typeof data.pdfDoc.usdName === 'string') {
        this.isUSD_Text = true;
        this.UsdName = data.pdfDoc.usdName;
      } else {
        this.UsdName = !isNullOrUndefined(data.pdfDoc.usdName) ? data.pdfDoc.usdName.usdName : null;
      }
      if (typeof data.pdfDoc.usdNumber === 'string') {
        this.isUSD_number_Text = true;
        this.UsdNumber = data.pdfDoc.usdNumber;
      } else {
        this.UsdNumber = !isNullOrUndefined(data.pdfDoc.usdNumber) ? data.pdfDoc.usdNumber.usd : null;
      }


      if (typeof data.pdfDoc.orgin_usdName === 'string') {
        this.isOriginUSD_Text = true;
        this.orgin_usdName = data.pdfDoc.orgin_usdName;
      } else {
        this.orgin_usdName = !isNullOrUndefined(data.pdfDoc.orgin_usdName) ? data.pdfDoc.orgin_usdName.usdName : null;
      }
      if (typeof data.pdfDoc.usd_orgin_Number === 'string') {
        this.isUSD_orgin_number_Text = true;
        this.Usd_Orgin_Number = data.pdfDoc.usd_orgin_Number;
      } else {
        this.Usd_Orgin_Number = !isNullOrUndefined(data.pdfDoc.usd_orgin_Number) ? data.pdfDoc.usd_orgin_Number.usd : null;
      }


      if (typeof data.pdfDoc.pre_usdName === 'string') {
        this.isPreUsdNameText = true;
        this.pre_usdName = data.pdfDoc.pre_usdName;
      } else {
        this.pre_usdName = !isNullOrUndefined(data.pdfDoc.pre_usdName) ? data.pdfDoc.pre_usdName.usdName : null;
      }
      if (typeof data.pdfDoc.usd_pre_Number === 'string') {
        this.isUsdNumberText = true;
        this.usd_pre_Number = data.pdfDoc.usd_pre_Number;
      } else {
        this.usd_pre_Number = !isNullOrUndefined(data.pdfDoc.usd_pre_Number) ? data.pdfDoc.usd_pre_Number.usd : null;
      }


      if (data.pdfDoc.isSchoolName_Text == true) {
        this.eeispf.schoolName = data.pdfDoc.schoolName;
      } else {
        if (typeof data.pdfDoc.schoolName === 'string') {
          data.pdfDoc.schoolName = {
            Address: this.eeispf.schoolAddress,
            BeginDate: null,
            BuildingNumber: null,
            ChangedBy: null,
            ChangedDate: null,
            CityID: null,
            CountyID: null,
            CreatedDate: null,
            ESSAPointOfContact: null,
            EndDate: null,
            EnteredBy: null,
            EnteredDate: null,
            Fax: null,
            GPSAddress: null,
            GPSCity: null,
            GPSLatitude: null,
            GPSLongitude: null,
            GPSState: null,
            GPSValidated: null,
            GPSXML: null,
            GPSZipcode: null,
            IsActive: null,
            IsDoNotSendToPOC: null,
            IsMultiState: null,
            IsPrivate: null,
            LastModifiedDate: null,
            Legacy_SchoolID: null,
            Notes: null,
            Nurse_FirstName: null,
            Nurse_LastName: null,
            Nurse_MI: null,
            Phone: null,
            Principal_FirstName: null,
            Principal_LastName: null,
            Principal_MI: null,
            RegistrarEmail: null,
            SchoolID: null,
            SchoolName: data.pdfDoc.schoolName,
            StateID: null,
            USD: null,
            UpdatedDate: null,
            VicePrincipal_FirstName: null,
            VicePrincipal_LastName: null,
            VicePrincipal_MI: null,
            ZipcodeID: null,
            clientID: null,
            completedAddress: null,
            isDeleted: null,
            usdname: null,
          };
          this.schoolName = !isNullOrUndefined(data.pdfDoc.schoolName) ? data.pdfDoc.schoolName.SchoolName : null;
          console.log("data.pdfDoc.schoolName>>>>>>>>>", data.pdfDoc.schoolName);
        } else {
          console.log("data.pdfDoc.schoolName>>>>>>>>>>>>>>>", data.pdfDoc.schoolName);
          this.schoolName = !isNullOrUndefined(data.pdfDoc.schoolName) ? data.pdfDoc.schoolName.SchoolName : null;
        }
      }
      if (data.pdfDoc.isOrgin_schoolnameText == true) {
        this.eeispf.schoolName = data.pdfDoc.schoolOriginName;
      } else {
        if (typeof data.pdfDoc.schoolOriginName === 'string') {
          data.pdfDoc.schoolOriginName = {
            Address: this.eeispf.schoolAddress,
            BeginDate: null,
            BuildingNumber: null,
            ChangedBy: null,
            ChangedDate: null,
            CityID: null,
            CountyID: null,
            CreatedDate: null,
            ESSAPointOfContact: null,
            EndDate: null,
            EnteredBy: null,
            EnteredDate: null,
            Fax: null,
            GPSAddress: null,
            GPSCity: null,
            GPSLatitude: null,
            GPSLongitude: null,
            GPSState: null,
            GPSValidated: null,
            GPSXML: null,
            GPSZipcode: null,
            IsActive: null,
            IsDoNotSendToPOC: null,
            IsMultiState: null,
            IsPrivate: null,
            LastModifiedDate: null,
            Legacy_SchoolID: null,
            Notes: null,
            Nurse_FirstName: null,
            Nurse_LastName: null,
            Nurse_MI: null,
            Phone: null,
            Principal_FirstName: null,
            Principal_LastName: null,
            Principal_MI: null,
            RegistrarEmail: null,
            SchoolID: null,
            SchoolName: data.pdfDoc.schoolOriginName,
            StateID: null,
            USD: null,
            UpdatedDate: null,
            VicePrincipal_FirstName: null,
            VicePrincipal_LastName: null,
            VicePrincipal_MI: null,
            ZipcodeID: null,
            clientID: null,
            completedAddress: null,
            isDeleted: null,
            usdname: null,
          };
          this.schoolOriginName = data.pdfDoc.schoolName;
        } else {
          this.schoolOriginName = !isNullOrUndefined(data.pdfDoc.schoolOriginName) ? data.pdfDoc.schoolOriginName.SchoolName : null;
        }
      }

      if (data.pdfDoc.isPreviousSchoolNameText == true) {
        this.eeispf.previousSchoolName = data.pdfDoc.previousSchoolName;
      } else {
        if (typeof data.pdfDoc.previousSchoolName === 'string') {
          data.pdfDoc.previousSchoolName = {
            Address: this.eeispf.schoolAddress,
            BeginDate: null,
            BuildingNumber: null,
            ChangedBy: null,
            ChangedDate: null,
            CityID: null,
            CountyID: null,
            CreatedDate: null,
            ESSAPointOfContact: null,
            EndDate: null,
            EnteredBy: null,
            EnteredDate: null,
            Fax: null,
            GPSAddress: null,
            GPSCity: null,
            GPSLatitude: null,
            GPSLongitude: null,
            GPSState: null,
            GPSValidated: null,
            GPSXML: null,
            GPSZipcode: null,
            IsActive: null,
            IsDoNotSendToPOC: null,
            IsMultiState: null,
            IsPrivate: null,
            LastModifiedDate: null,
            Legacy_SchoolID: null,
            Notes: null,
            Nurse_FirstName: null,
            Nurse_LastName: null,
            Nurse_MI: null,
            Phone: null,
            Principal_FirstName: null,
            Principal_LastName: null,
            Principal_MI: null,
            RegistrarEmail: null,
            SchoolID: null,
            SchoolName: data.pdfDoc.previousSchoolName,
            StateID: null,
            USD: null,
            UpdatedDate: null,
            VicePrincipal_FirstName: null,
            VicePrincipal_LastName: null,
            VicePrincipal_MI: null,
            ZipcodeID: null,
            clientID: null,
            completedAddress: null,
            isDeleted: null,
            usdname: null,
          };
          this.previousSchoolName = data.pdfDoc.schoolName;
        } else {
          this.previousSchoolName = !isNullOrUndefined(data.pdfDoc.previousSchoolName) ? data.pdfDoc.previousSchoolName.SchoolName : null;
        }
      }
      !isNullOrUndefined(data.pdfDoc.dateStaffed) ? data.pdfDoc.dateStaffed = new Date(data.pdfDoc.dateStaffed) : null;
      !isNullOrUndefined(data.pdfDoc.DOPBeginDate) ? data.pdfDoc.DOPBeginDate = new Date(data.pdfDoc.DOPBeginDate) : null;
      !isNullOrUndefined(data.pdfDoc.p_DOPBeginDate) ? data.pdfDoc.p_DOPBeginDate = new Date(data.pdfDoc.p_DOPBeginDate) : null;
      !isNullOrUndefined(data.pdfDoc.DOPEndDate) ? data.pdfDoc.DOPEndDate = new Date(data.pdfDoc.DOPEndDate) : null;
      !isNullOrUndefined(data.pdfDoc.p_DOPEndDate) ? data.pdfDoc.p_DOPEndDate = new Date(data.pdfDoc.p_DOPEndDate) : null;
      !isNullOrUndefined(data.pdfDoc.dateStaffed1) ? data.pdfDoc.dateStaffed1 = new Date(data.pdfDoc.dateStaffed1) : null;
      !isNullOrUndefined(data.pdfDoc.dateStaffed2) ? data.pdfDoc.dateStaffed2 = new Date(data.pdfDoc.dateStaffed2) : null;
      !isNullOrUndefined(data.pdfDoc.enrollmentDate) ? data.pdfDoc.enrollmentDate = new Date(data.pdfDoc.enrollmentDate) : null;
      !isNullOrUndefined(data.pdfDoc.datesOfPlacement) ? data.pdfDoc.datesOfPlacement = new Date(data.pdfDoc.datesOfPlacement) : null;
      if (data.pdfDocDetails.pdfdocModeID.name === 'Draft') {
        !isNullOrUndefined(data.pdfDoc.schoolOriginDatesAttendedFrom) ? data.pdfDoc.schoolOriginDatesAttendedFrom = new Date((data.pdfDoc.schoolOriginDatesAttendedFrom)) : '';
        !isNullOrUndefined(data.pdfDoc.schoolOriginDatesAttendedTo) ? data.pdfDoc.schoolOriginDatesAttendedTo = new Date((data.pdfDoc.schoolOriginDatesAttendedTo)) : '';
        !isNullOrUndefined(data.pdfDoc.pre_schoolOriginDatesAttendedFrom) ? data.pdfDoc.pre_schoolOriginDatesAttendedFrom = new Date((data.pdfDoc.pre_schoolOriginDatesAttendedFrom)) : null;
        !isNullOrUndefined(data.pdfDoc.pre_schoolOriginDatesAttendedTo) ? data.pdfDoc.pre_schoolOriginDatesAttendedTo = new Date((data.pdfDoc.pre_schoolOriginDatesAttendedTo)) : null;
      } else {
        this.isRedirect = false;
        !isNullOrUndefined(data.pdfDoc.schoolOriginDatesAttendedFrom) ? data.pdfDoc.schoolOriginDatesAttendedFrom = new Date((data.pdfDoc.schoolOriginDatesAttendedFrom)) : '';
        !isNullOrUndefined(data.pdfDoc.schoolOriginDatesAttendedTo) ? data.pdfDoc.schoolOriginDatesAttendedTo = new Date((data.pdfDoc.schoolOriginDatesAttendedTo)) : '';
        !isNullOrUndefined(data.pdfDoc.pre_schoolOriginDatesAttendedFrom) ? data.pdfDoc.pre_schoolOriginDatesAttendedFrom = new Date((data.pdfDoc.pre_schoolOriginDatesAttendedFrom)) : null;
        !isNullOrUndefined(data.pdfDoc.pre_schoolOriginDatesAttendedTo) ? data.pdfDoc.pre_schoolOriginDatesAttendedTo = new Date((data.pdfDoc.pre_schoolOriginDatesAttendedTo)) : null;
      }

      !isNullOrUndefined(data.pdfDoc.dob) ? data.pdfDoc.dob = new Date(data.pdfDoc.dob) : null;
      !isNullOrUndefined(data.pdfDoc.date) ? data.pdfDoc.date = new Date(data.pdfDoc.date) : null;
      !isNullOrUndefined(data.pdfDoc.educationPlacementDates) ? data.pdfDoc.educationPlacementDates = new Date(parseInt(data.pdfDoc.educationPlacementDates)) : '';
      !isNullOrUndefined(data.pdfDoc.suspendedDate) ? data.pdfDoc.suspendedDate = new Date(parseInt(data.pdfDoc.suspendedDate)) : '';
      !isNullOrUndefined(data.pdfDoc.studentExpelledDate) ? data.pdfDoc.studentExpelledDate = new Date(parseInt(data.pdfDoc.studentExpelledDate)) : '';
      if (data.pdfDoc.other === 'false' || data.pdfDoc.other === false) {

      } else {
        this.showOtherText = true
      }
      this.UsdName = !isNullOrUndefined(data.pdfDoc.usdName) ? data.pdfDoc.usdName.usdName : null;
      this.UsdNumber = !isNullOrUndefined(data.pdfDoc.usdNumber) ? data.pdfDoc.usdNumber.usd : null;

      this.schoolID1 = !isNullOrUndefined(data.pdfDoc.schoolID1) ? data.pdfDoc.schoolID1 : "";
      this.schoolID2 = !isNullOrUndefined(data.pdfDoc.schoolID2) ? data.pdfDoc.schoolID2 : "";


      this.previous_placementName = !isNullOrUndefined(data.pdfDoc.placementNames) ? data.pdfDoc.placementNames.placementName : null;
      this.pre_previous_placementName = !isNullOrUndefined(data.pdfDoc.educationPlacementName) ? data.pdfDoc.educationPlacementName.placementName : null;

      this.orgin_usdName = !isNullOrUndefined(data.pdfDoc.usd_orgin_Number) ? data.pdfDoc.usd_orgin_Number.usdName : null;
      this.Usd_Orgin_Number = !isNullOrUndefined(data.pdfDoc.usd_orgin_Number) ? data.pdfDoc.usd_orgin_Number.usd : null;

      this.pre_usdName = !isNullOrUndefined(data.pdfDoc.usd_pre_Number) ? data.pdfDoc.usd_pre_Number.usdName : null;
      this.usd_pre_Number = !isNullOrUndefined(data.pdfDoc.usd_pre_Number) ? data.pdfDoc.usd_pre_Number.usd : null;

      this.coordName = !isNullOrUndefined(data.pdfDoc.eduCoordName) ? data.pdfDoc.eduCoordName.fullName : null;









      // delete data.pdfDoc.enrollmentDate;
      delete data.pdfDoc.schoolOriginDatesAttended;
      this.print_attendees = !isNullOrUndefined(data.pdfDoc.attendees) ? data.pdfDoc.attendees.replace(/\n/g, "<br />") : null;
      this.print_decisionSummary = !isNullOrUndefined(data.pdfDoc.decisionSummary) ? data.pdfDoc.decisionSummary.replace(/\n/g, "<br />") : null;
      this.print_studentName = !isNullOrUndefined(data.pdfDoc.studentName) ? data.pdfDoc.studentName.replace(/\n/g, "<br />") : null;
      this.print_placementAddress = !isNullOrUndefined(data.pdfDoc.placementAddress) ? data.pdfDoc.placementAddress.replace(/\n/g, "<br />") : null;
      this.print_placementTelephoneNumbers = !isNullOrUndefined(data.pdfDoc.placementTelephoneNumbers) ? data.pdfDoc.placementTelephoneNumbers.replace(/\n/g, "<br />") : null;
      this.print_schoolOriginAddress = !isNullOrUndefined(data.pdfDoc.schoolOriginAddress) ? data.pdfDoc.schoolOriginAddress.replace(/\n/g, "<br />") : null;
      this.print_educationPlacementAddress = !isNullOrUndefined(data.pdfDoc.educationPlacementAddress) ? data.pdfDoc.educationPlacementAddress.replace(/\n/g, "<br />") : null;
      this.print_previousSchoolAddress = !isNullOrUndefined(data.pdfDoc.previousSchoolAddress) ? data.pdfDoc.previousSchoolAddress.replace(/\n/g, "<br />") : null;
      this.print_explainIfYes = !isNullOrUndefined(data.pdfDoc.explainIfYes) ? data.pdfDoc.explainIfYes.replace(/\n/g, "<br />") : null;
      this.print_safetyPrecautions = !isNullOrUndefined(data.pdfDoc.safetyPrecautions) ? data.pdfDoc.safetyPrecautions.replace(/\n/g, "<br />") : null;
      this.print_homeCareReasons = !isNullOrUndefined(data.pdfDoc.homeCareReasons) ? data.pdfDoc.homeCareReasons.replace(/\n/g, "<br />") : null;
      this.print_currentMedications = !isNullOrUndefined(data.pdfDoc.currentMedications) ? data.pdfDoc.currentMedications.replace(/\n/g, "<br />") : null;
      this.print_healthConditions = !isNullOrUndefined(data.pdfDoc.healthConditions) ? data.pdfDoc.healthConditions.replace(/\n/g, "<br />") : null;
      this.print_otherInformation = !isNullOrUndefined(data.pdfDoc.otherInformation) ? data.pdfDoc.otherInformation.replace(/\n/g, "<br />") : null;
      this.print_addressParent = !isNullOrUndefined(data.pdfDoc.addressParent) ? data.pdfDoc.addressParent.replace(/\n/g, "<br />") : null;
      this.print_additionalDetails = !isNullOrUndefined(data.pdfDoc.additionalDetails) ? data.pdfDoc.additionalDetails.replace(/\n/g, "<br />") : null;
      this.print_fatherAddress = !isNullOrUndefined(data.pdfDoc.fatherAddress) ? data.pdfDoc.fatherAddress.replace(/\n/g, "<br />") : null;
      this.print_fatherAdditionalDetails = !isNullOrUndefined(data.pdfDoc.fatherAdditionalDetails) ? data.pdfDoc.fatherAdditionalDetails.replace(/\n/g, "<br />") : null;
      this.print_advocateAddress = !isNullOrUndefined(data.pdfDoc.advocateAddress) ? data.pdfDoc.advocateAddress.replace(/\n/g, "<br />") : null;
      this.print_managerAddress = !isNullOrUndefined(data.pdfDoc.managerAddress) ? data.pdfDoc.managerAddress.replace(/\n/g, "<br />") : null;
      this.print_familySupportWorkerName = !isNullOrUndefined(data.pdfDoc.familySupportWorkerName) ? data.pdfDoc.familySupportWorkerName.replace(/\n/g, "<br />") : null;
      this.print_familySupWorkAddress = !isNullOrUndefined(data.pdfDoc.familySupWorkAddress) ? data.pdfDoc.familySupWorkAddress.replace(/\n/g, "<br />") : null;
      this.print_supervisorAddress = !isNullOrUndefined(data.pdfDoc.supervisorAddress) ? data.pdfDoc.supervisorAddress.replace(/\n/g, "<br />") : null;
      this.print_eduCoordAddress = !isNullOrUndefined(data.pdfDoc.eduCoordAddress) ? data.pdfDoc.eduCoordAddress.replace(/\n/g, "<br />") : null;
      this.print_fosterCareAddress = !isNullOrUndefined(data.pdfDoc.fosterCareAddress) ? data.pdfDoc.fosterCareAddress.replace(/\n/g, "<br />") : null;
      this.print_placementAddress1 = !isNullOrUndefined(data.pdfDoc.placementAddress1) ? data.pdfDoc.placementAddress1.replace(/\n/g, "<br />") : null;
      // delete data.pdfDoc.datesOfPlacement;
      this.eeispf = data.pdfDoc;
      // this.eeispf.placementName = data.pdfDoc.placementName;
      // this.eeispf.placementNames = data.pdfDoc.placementNames;
      // this.eeispf.educationPlacementName = data.pdfDoc.educationPlacementName;
      // console.log("this.eeispf.placementName>>>>>", JSON.stringify(this.eeispf.placementName));
      // console.log("data.pdfDoc.placementNames>>>>>", JSON.stringify(data.pdfDoc.placementNames));
      this.isEdit = true;
      this.educationEnrollForm.disable();
      this.isFormLog = true;
      this.formLogInfo.changedBy = !isNullOrUndefined(data.pdfDocDetails.changedBy) ? data.pdfDocDetails.changedBy : '------';
      this.formLogInfo.changedDate = !isNullOrUndefined(data.pdfDocDetails.changedDate) ? moment(data.pdfDocDetails.changedDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';
      this.formLogInfo.enteredBy = !isNullOrUndefined(data.pdfDocDetails.enteredBy) ? data.pdfDocDetails.enteredBy : '------';
      this.formLogInfo.enteredDate = !isNullOrUndefined(data.pdfDocDetails.enteredDate) ? moment(data.pdfDocDetails.enteredDate).format('MM/DD/YYYY hh:mm:ss A') : '--:--:-- --';

    })
    this.isUpdate = true;
  }

  editForm() {
    this.educationEnrollForm.enable();
    this.isEdit = false;
  }

  // configMail() {
  //   let referralId = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey();
  //   let req = { referralID: referralId };

  //   this._opencard.configMailByRefID(req).then((data: any) => {
  //     console.log("data response in mail is", data, "type of data is", typeof (data));
  //   })
  // }

  retriveEmailIds() {
    if ((environment.localUrl == 'http://104.211.245.48:8080/SFCS-WebApp/sfcs/') || (environment.localUrl == 'https://test-cms.st-francis.org/tomcat/'
      || environment.localUrl == 'https://child-welfare.st-francis.org/tomcat/') || (environment.localUrl == 'https://preprod-cms.st-francis.org/tomcat/')) {
      this.emailAddressOne = 'Kathy.Carter@st-francis.org';
      this.emailAddressTwo = 'Stephanie.Pfannenstiel@st-francis.org';
      this.emailAddressThree = 'Jennifer.Walters@st-francis.org';
      this.emailAddressFour = 'keshavaraj.shanmugam@st-francis.org'
    } else {
      if (this.eeispfAutoFetch.lastTwoAttendingSchool[0].registrarEmail !== null && this.eeispfAutoFetch.lastTwoAttendingSchool[1].registrarEmail !== null) {
        this.emailAddressOne = this.eeispfAutoFetch.lastTwoAttendingSchool[0].registrarEmail;
        this.emailAddressTwo = this.eeispfAutoFetch.lastTwoAttendingSchool[1].registrarEmail;
      } else {
        swal('Info', 'Email id is not found!', 'info');
      }
    }


  }
  isPdf = false;
  testingPur: any;
  getDate(date) {
    this.eeispf.dateStaffed = moment(date).format('MM/DD/YYYY hh:mm:ss A');
  }

  emailShow = false;
  finalyzeSource: any;
  async finalizeDraft(source) {
    this.isPdf = true
    this.finalyzeSource = source;
    // this.isRedirect = false;
    // this.isPdf = true;
    // source.schoolName = this.schoolName;

    // let usdName: string, schoolName: string, schoolCity: string;
    // !isNullOrUndefined(source.usdName) ? (usdName = source.usdName) : null;
    // !isNullOrUndefined(source.schoolName)
    //   ? (schoolName = source.schoolName)
    //   : null;

    // if (source.isIEPYES) {
    //   source["specialEcucation"] = true;
    // } else {
    //   source["specialEcucation"] = false;
    // }
    // if (source.isIEP504YES) {
    //   source["generalEducation"] = true;
    // } else {
    //   source["generalEducation"] = false;
    // };
    // var tmpStr = this.educationEnrolMails.toString();
    // this.educationEnrolMailIDS = tmpStr.replace(/[\[\]']+/g, '');
    // var schoolIDS = this.eeispf.essa1_email + "," + this.eeispf.essa2_email;
    // let str = "Emails To Be Sent: 1." + schoolIDS + " 2." + this.educationEnrolMailIDS + " 3. " + this.emailAddressTwo;
    this.allSendEmails = [];
    if (this.eeispf.essa1_email != null) {
      var schoolEmailObJ1 = {
        email: this.eeispf.essa1_email,
        value: 'school'
      };
      this.allSendEmails.push(schoolEmailObJ1);
    }

    if (this.eeispf.essa2_email != null) {
      var schoolEmailObJ2 = {
        email: this.eeispf.essa2_email,
        value: 'school'
      }
      this.allSendEmails.push(schoolEmailObJ2);
    }


    if (this.educationEnrolMails[0] != null) {
      var educationEnrolEmail1 = {
        email: this.educationEnrolMails[0],
        value: 'EDUemail'
      }
      this.allSendEmails.push(educationEnrolEmail1);
    }
    if (this.educationEnrolMails[1] != null) {
      var educationEnrolEmail2 = {
        email: this.educationEnrolMails[1],
        value: 'EDUemail'
      }
      this.allSendEmails.push(educationEnrolEmail2);
    }
    if (this.emailAddressTwo != null) {
      var CaseTeam_ComplianceTech_Email = {
        email: this.emailAddressTwo,
        value: 'caseTcom'
      }
      this.allSendEmails.push(CaseTeam_ComplianceTech_Email);
    };
    await this.promptMessage();
    this.emailShow = true;

    // Swal.fire({
    //   title: "Are you sure?",
    //   text: str,
    //   type: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Verify To Finalize!",
    // }).then((result) => {
    //   console.log("result in swal is,", result);
    //   if (result.value) {
    //     Swal.fire("Verified!", "The form finalized", "success");

    //     let loader = document.getElementById("loading-overlay") as HTMLElement;
    //     loader.style.display = "block";
    //     !isNullOrUndefined(source.dateStaffed) ? source.dateStaffed = this._localValues.stringFormatDatetime(source.dateStaffed) : null;
    //     !isNullOrUndefined(source.dateStaffed1) ? source.dateStaffed1 = this._localValues.stringFormatDatetime(source.dateStaffed1) : null;
    //     !isNullOrUndefined(source.dateStaffed2) ? source.dateStaffed2 = this._localValues.stringFormatDatetime(source.dateStaffed2) : null;
    //     !isNullOrUndefined(source.DOPBeginDate) ? source.DOPBeginDate = this._localValues.stringFormatDatetime(Date.parse(source.DOPBeginDate)) : null;
    //     !isNullOrUndefined(source.DOPEndDate) ? source.DOPEndDate = this._localValues.stringFormatDatetime(Date.parse(source.DOPEndDate)) : null;
    //     !isNullOrUndefined(source.p_DOPEndDate) ? source.p_DOPEndDate = this._localValues.stringFormatDatetime(Date.parse(source.p_DOPEndDate)) : null;
    //     !isNullOrUndefined(source.p_DOPBeginDate) ? source.p_DOPBeginDate = this._localValues.stringFormatDatetime(Date.parse(source.p_DOPBeginDate)) : null;
    //     !isNullOrUndefined(source.schoolOriginDatesAttendedFrom) ? source.schoolOriginDatesAttendedFrom = this._localValues.stringFormatDatetime(Date.parse(source.schoolOriginDatesAttendedFrom)) : null;
    //     !isNullOrUndefined(source.schoolOriginDatesAttendedTo) ? source.schoolOriginDatesAttendedTo = this._localValues.stringFormatDatetime(Date.parse(source.schoolOriginDatesAttendedTo)) : null;
    //     !isNullOrUndefined(source.pre_schoolOriginDatesAttendedFrom) ? source.pre_schoolOriginDatesAttendedFrom = this._localValues.stringFormatDatetime(Date.parse(source.pre_schoolOriginDatesAttendedFrom)) : null;
    //     !isNullOrUndefined(source.pre_schoolOriginDatesAttendedTo) ? source.pre_schoolOriginDatesAttendedTo = this._localValues.stringFormatDatetime(Date.parse(source.pre_schoolOriginDatesAttendedTo)) : null;
    //     !isNullOrUndefined(source.dob) ? source.dob = this._localValues.stringFormatDatetime(Date.parse(source.dob)) : null;
    //     !isNullOrUndefined(source.date) ? source.date = this._localValues.stringFormatDatetime(Date.parse(source.date)) : null;
    //     !isNullOrUndefined(source.enrollmentDate) ? source.enrollmentDate = this._localValues.stringFormatDatetime(Date.parse(source.enrollmentDate)) : null;
    //     !isNullOrUndefined(source.datesOfPlacement) ? source.datesOfPlacement = this._localValues.stringFormatDatetime(Date.parse(source.datesOfPlacement)) : null;
    //     !isNullOrUndefined(source.educationPlacementDates) ? source.educationPlacementDates = this._localValues.stringFormatDatetime(Date.parse(source.educationPlacementDates)) : null;
    //     !isNullOrUndefined(source.suspendedDate) ? source.suspendedDate = this._localValues.stringFormatDatetime(Date.parse(source.suspendedDate)) : null;
    //     !isNullOrUndefined(source.studentExpelledDate) ? source.studentExpelledDate = this._localValues.stringFormatDatetime(Date.parse(source.studentExpelledDate)) : null;
    //     !isNullOrUndefined(source.schoolOriginDatesAttended) ? source.schoolOriginDatesAttended = this._localValues.stringFormatDatetime(Date.parse(source.schoolOriginDatesAttended)) : null;
    //     !isNullOrUndefined(source.previousSchoolDatesAttended) ? source.previousSchoolDatesAttended = this._localValues.stringFormatDatetime(Date.parse(source.previousSchoolDatesAttended)) : null;
    //     let clientName: any;
    //     let currentDate = moment(new Date()).format("MM/DD/YYYY");
    //     console.log("source after is", source);
    //     this.eeispf = source;
    //     this.jsonFormation(source);
    //     let referralId = this.routerReferralID;
    //     this.testingPur = "TESTING...";
    //     var element = document.getElementById("pdf");
    //     var opt = {
    //       margin: 1,
    //       filename:
    //         "EEISPF_" + localStorage.getItem("clientName") + "_" + currentDate,
    //       image: { type: "jpeg", quality: 1 },
    //       html2canvas: { scale: 1, dpi: 72, letterRendering: true },
    //       jsPDF: { unit: "cm", format: "a3", orientation: "portrait" },

    //       pagebreak: { mode: "avoid-all", before: "#page2el" },
    //     };
    //     if (this.isFinalizeWithDownload) {
    //       html2pdf().from(element).set(opt).save();
    //     }

    //     let pdf = html2pdf().from(element).set(opt).output("blob");
    //     return pdf.then((data: any) => {
    //       console.log("data in eeispf is", data);
    //       let mailFormData: FormData = new FormData();
    //       let req: any;
    //       if (this.isUpdate) {
    //         req = {
    //           pdfdocID: this.redirectPdfDocID,
    //           jsonData: JSON.stringify(source),
    //           referralID: referralId,
    //           "mailConfig": {
    //             "CaseTeam_ComplianceTech_Email": this.emailAddressTwo,
    //             "schoolIDS": schoolIDS,
    //             "EducationCoordinatorID": this.educationEnrolMailIDS
    //           },

    //           clientID: this.routerClientID,
    //           usdName: usdName,
    //           schoolName: schoolName,
    //           schoolCity: schoolCity,
    //           userID: this.currentUserId || 4620
    //         };
    //         if (this.eeispf.isIEPYES) {
    //           req["specialEducation"] = true;
    //           req["staffID"] = this.currentUserId || 4620;
    //         }

    //         if (this.eeispf.isIEP504YES) {
    //           req["generalEducation"] = true;
    //           req["staffID"] = this.currentUserId || 4620;
    //         }
    //       } else {
    //         req = {
    //           jsonData: JSON.stringify(source),
    //           referralID: referralId,
    //           mailConfig: {
    //             CaseTeam_ComplianceTech_Email: this.emailAddressTwo,
    //             schoolIDS: schoolIDS,
    //             EducationCoordinatorID: this.educationEnrolMailIDS
    //           },
    //           clientID: this.routerClientID,
    //           usdName: usdName,
    //           schoolName: this.eeispf.schoolName,
    //           schoolCity: schoolCity,
    //           userID: this.currentUserId || 4620
    //         };
    //         if (this.eeispf.isIEPYES) {
    //           req["specialEducation"] = true;
    //           req["staffID"] = this.currentUserId || 4620;
    //         }

    //         if (this.eeispf.isIEP504YES) {
    //           req["generalEducation"] = true;
    //           req["staffID"] = this.currentUserId || 4620;
    //         }
    //       }

    //       console.log("mail req is *****", req);

    //       mailFormData.append("fileStream", data);
    //       mailFormData.append("eduJson", JSON.stringify(req));

    //       this._educationEnroll.saveFinalize(mailFormData).then(() => {
    //         loader.style.display = "none";
    //         swal("Finalize", data.responseMessage, "success");

    //         return this._router.navigate([
    //           "/reintegration/referral/opencard/school/eeispf/view",
    //         ], {
    //             queryParamsHandling: "preserve",
    //           });
    //       });
    //     });
    //   } else {
    //     this.isPdf = false;
    //   }
    // });
  }








  getMetaData(event, label) {
    let reqObj: any, request: any;
    switch (label) {
      case 'grade':
        reqObj = 'grade';
        break;

    }
    request = { Object: reqObj, value: event.query }
    if (reqObj) {
      this._CaseTeamService.getSearchList(request).then((data) => {
        this.metaData = data.dropDown;
      })
    }

  }

  getLastTwoSchoolEmails() {
    let req = {
      referralID: this.routerReferralID,
      clientID: this.routerClientID
    }
    this._opencard.eeispfEmails(req).then((data: any) => {
      this.eeispfAutoFetch.lastTwoAttendingSchool = data.lastTwoAttendingSchool;
      this.all_plaementList = data.placementDetail;
      this.allPlacementLists = data.placementDetail;
      if (!this.is_Update) {
        this.eeispfAutoFetch.lastTwoAttendingSchool = data.lastTwoAttendingSchool;
        this.eeispfAutoFetch.clientCaseTeamDetails = data.clientCaseTeamDetails;
        this.eeispfAutoFetch.placementDetails = data.placementDetail;
        this.eeispfAutoFetch.clientFamilyMemberDetails = data.clientFamilyMemberDetails;
      }
    }).then(() => {
      this.autoFetchInfomration();
    })
  }
  schoolID1: any;
  schoolID2: any;
  schoolID3: any;
  placementNames: any;
  previous_placementName: any;
  pre_previous_placementName: any;
  autoFetchInfomration() {
    /** Part B section 1  - Placement informations */
    this.all_plaementList = this.eeispfAutoFetch.placementDetails;
    this.allPlacementLists = this.eeispfAutoFetch.placementDetails;
    if (!this.is_Update) {
      this.eeispf.studentName = (this.eeispfAutoFetch.placementDetails.length > 0) ? this.eeispfAutoFetch.placementDetails[0].clientName : null;
      this.eeispf.dob = (this.eeispfAutoFetch.placementDetails.length > 0) ? new Date(this.eeispfAutoFetch.placementDetails[0].dob) : null;
      this.eeispf.date = (this.eeispfAutoFetch.placementDetails.length > 0) ? new Date(this.eeispfAutoFetch.placementDetails[0].beginDate) : null;

      this.eeispf.ssn = (this.eeispfAutoFetch.placementDetails.length > 0) ? this.eeispfAutoFetch.placementDetails[0].ssn.replace(/.(?=.{4})/g, 'X') : null;
      this.eeispf.placementNames = (this.eeispfAutoFetch.placementDetails.length > 0) ? this.eeispfAutoFetch.placementDetails[0] : null;


      this.placementNames = (this.eeispfAutoFetch.placementDetails.length > 0) ? this.eeispfAutoFetch.placementDetails[0].placementName : null;
      this.previous_placementName = (this.eeispfAutoFetch.placementDetails.length > 1) ? this.eeispfAutoFetch.placementDetails[1].placementName : null;
      this.pre_previous_placementName = (this.eeispfAutoFetch.placementDetails.length > 2) ? this.eeispfAutoFetch.placementDetails[2].placementName : null;

      if (this.eeispfAutoFetch.placementDetails.length > 0) {
        this.eeispf.placementAddress = `${this.eeispfAutoFetch.placementDetails[0].address1}, ${this.eeispfAutoFetch.placementDetails[0].city}, ${this.eeispfAutoFetch.placementDetails[0].state}, ${this.eeispfAutoFetch.placementDetails[0].zipcode}`
      }
      this.eeispf.placementTelephoneNumbers = (this.eeispfAutoFetch.placementDetails.length > 0) ? this.eeispfAutoFetch.placementDetails[0].phone : null;
      this.eeispf.placementEmailAddress = (this.eeispfAutoFetch.placementDetails.length > 0) ? this.eeispfAutoFetch.placementDetails[0].Email : null;
    }

    /** Part B section 3 - Last two attending schools */
    // this.eeispf.schoolOriginName = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1] : null;
    this.schoolID1 = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 0) ? this.eeispfAutoFetch.lastTwoAttendingSchool[0].registrarEmail : "";
    this.schoolID2 = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].registrarEmail : "";
    this.eeispf.school2BuildEmail = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 0) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].registrarEmail : null;
    this.eeispf.school2buildName = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 0) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].eSSAPointOfContact : null;
    this.eeispf.school3BuildEmail = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 0) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].registrarEmail : null;
    this.eeispf.school3buildName = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 0) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].eSSAPointOfContact : null;

    this.schoolID3 = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].registrarEmail : "";
    this.eeispf.schoolID1 = this.schoolID1;
    this.eeispf.schoolID2 = this.schoolID2;
    if (!this.is_Update) {
      this.eeispf.schoolOriginName = {
        "completedAddress": null,
        "SchoolID": (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].schoolID : null,
        "ESSAPointOfContact": null,
        "GPSAddress": null,
        "GPSCity": null,
        "GPSLatitude": null,
        "GPSLongitude": null,
        "GPSState": null,
        "GPSValidated": null,
        "GPSZipcode": null,
        "Address": (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].address : null,
        "BeginDate": null,
        "BuildingNumber": null,
        "ChangedBy": null,
        "ChangedDate": null,
        "EndDate": (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].endDate : null,
        "EnteredBy": null,
        "EnteredDate": null,
        "Fax": (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].fax : null,
        "GPSXML": null,
        "IsDoNotSendToPOC": null,
        "IsMultiState": null,
        "IsPrivate": null,
        "Legacy_SchoolID": null,
        "Notes": null,
        "Nurse_FirstName": null,
        "Nurse_LastName": null,
        "Nurse_MI": null,
        "Phone": (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].phone : null,
        "Principal_FirstName": null,
        "Principal_LastName": null,
        "Principal_MI": null,
        "RegistrarEmail": null,
        "SchoolName": (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].schoolName : null,
        "USD": null,
        "VicePrincipal_FirstName": null,
        "VicePrincipal_LastName": null,
        "VicePrincipal_MI": null,
        "CityID": null,
        "CountyID": null,
        "StateID": null,
        "ZipcodeID": null,
        "CreatedDate": null,
        "IsActive": null,
        "isDeleted": null,
        "LastModifiedDate": null,
        "UpdatedDate": null
      };


      if (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) {
        this.eeispf.schoolOriginAddress =
          `${this.eeispfAutoFetch.lastTwoAttendingSchool[1].address}, ${this.eeispfAutoFetch.lastTwoAttendingSchool[1].city}, ${this.eeispfAutoFetch.lastTwoAttendingSchool[1].state}, ${this.eeispfAutoFetch.lastTwoAttendingSchool[1].zipcode}`;
      }
      this.eeispf.schoolOriginPhone = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].phone : null;
      this.eeispf.schoolFaxEmail = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].registrarEmail : null;
      this.eeispf.school1Fax = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].fax : null;

      this.eeispf.schoolOriginESSA = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].eSSAPointOfContact : null;
      // this.eeispf.schoolOriginPhoneOREmail = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[1].fax)? this.eeispfAutoFetch.lastTwoAttendingSchool[1].fax : null;
      this.schoolOriginDatesAttended =
        `${(this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? moment(this.eeispfAutoFetch.lastTwoAttendingSchool[1].beginDate).format('MM/DD/YYYY') : ''} -
     ${(this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? ' to ' + moment(this.eeispfAutoFetch.lastTwoAttendingSchool[1].endDate).format('MM/DD/YYYY') : ''}`;

      this.eeispf.schoolOriginDatesAttendedFrom =
        (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? new Date(this.eeispfAutoFetch.lastTwoAttendingSchool[1].beginDate) : '';
      this.eeispf.schoolOriginDatesAttendedTo =
        (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? new Date(this.eeispfAutoFetch.lastTwoAttendingSchool[1].endDate) : '';



      this.eeispf.placementName = (this.eeispfAutoFetch.placementDetails.length > 1) ? this.eeispfAutoFetch.placementDetails[1] : null;
      this.eeispf.educationPlacementName = (this.eeispfAutoFetch.placementDetails.length > 2) ? this.eeispfAutoFetch.placementDetails[2] : null;
      this.eeispf.datesOfPlacement =
        (this.eeispfAutoFetch.placementDetails.length > 1) ? new Date(this.eeispfAutoFetch.placementDetails[0].beginDate) : '';
      this.eeispf.DOPBeginDate =
        (this.eeispfAutoFetch.placementDetails.length > 1) ? new Date(this.eeispfAutoFetch.placementDetails[1].beginDate) : '';
      // this.eeispf.DOPEndDate =
      //   (this.eeispfAutoFetch.placementDetails.length > 1) ? new Date(this.eeispfAutoFetch.placementDetails[0].endDate) : '';
      // ${(this.eeispfAutoFetch.placementDetails.length > 1) ? ' to ' + moment(this.eeispfAutoFetch.placementDetails[1].endDate).format('MM/DD/YYYY') : ''}`

      if (this.eeispfAutoFetch.placementDetails.length > 1) {
        if (this.eeispfAutoFetch.placementDetails[1].endDate === null) {
          this.eeispf.DOPEndDate = null;
        } else {
          this.eeispf.DOPEndDate = (this.eeispfAutoFetch.placementDetails.length > 1) ? new Date(this.eeispfAutoFetch.placementDetails[1].endDate) : null;
        }
      }



      if (this.eeispfAutoFetch.placementDetails.length > 1) {
        this.eeispf.placementAddress1 =
          `${this.eeispfAutoFetch.placementDetails[1].address1}, ${this.eeispfAutoFetch.placementDetails[1].city},  ${this.eeispfAutoFetch.placementDetails[1].state}, ${this.eeispfAutoFetch.placementDetails[1].zipcode}`

      }

      this.eeispf.placementPhone = (this.eeispfAutoFetch.placementDetails.length > 1) ? this.eeispfAutoFetch.placementDetails[1].phone : null;
      this.eeispf.placementEmail = (this.eeispfAutoFetch.placementDetails.length > 1) ? this.eeispfAutoFetch.placementDetails[1].Email : null;

      // this.eeispf.previousSchoolName = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].schoolName : null;

      this.eeispf.previousSchoolName = {
        "completedAddress": null,
        "SchoolID": (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].schoolID : null,
        "ESSAPointOfContact": null,
        "GPSAddress": null,
        "GPSCity": null,
        "GPSLatitude": null,
        "GPSLongitude": null,
        "GPSState": null,
        "GPSValidated": null,
        "GPSZipcode": null,
        "Address": (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].address : null,
        "BeginDate": null,
        "BuildingNumber": null,
        "ChangedBy": null,
        "ChangedDate": null,
        "EndDate": (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].endDate : null,
        "EnteredBy": null,
        "EnteredDate": null,
        "Fax": (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].fax : null,
        "GPSXML": null,
        "IsDoNotSendToPOC": null,
        "IsMultiState": null,
        "IsPrivate": null,
        "Legacy_SchoolID": null,
        "Notes": null,
        "Nurse_FirstName": null,
        "Nurse_LastName": null,
        "Nurse_MI": null,
        "Phone": (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].phone : null,
        "Principal_FirstName": null,
        "Principal_LastName": null,
        "Principal_MI": null,
        "RegistrarEmail": null,
        "SchoolName": (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].schoolName : null,
        "USD": null,
        "VicePrincipal_FirstName": null,
        "VicePrincipal_LastName": null,
        "VicePrincipal_MI": null,
        "CityID": null,
        "CountyID": null,
        "StateID": null,
        "ZipcodeID": null,
        "CreatedDate": null,
        "IsActive": null,
        "isDeleted": null,
        "LastModifiedDate": null,
        "UpdatedDate": null
      };



      if (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) {
        let prevAddress = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[2].address) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].address : "";
        let prevCity = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[2].city) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].city : "";
        let prevState = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[2].state) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].state : "";
        let prevZipcode = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[2].zipcode) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].zipcode : "";

        this.eeispf.previousSchoolAddress = `${prevAddress}, ${prevCity}, ${prevState}, ${prevZipcode}`;
      }
      this.eeispf.previousSchoolPhoneNumber = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].phone : null;
      this.eeispf.previousSchoolFaxOrEmail = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].registrarEmail : null;
      this.eeispf.previousSchoolEmail = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].registrarEmail : null;
      this.eeispf.previousSchoolFax = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].fax : null;
      this.eeispf.previousSchoolESSA = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].eSSAPointOfContact : null;
      this.previousSchoolDatesAttended =
        `${(this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? moment(this.eeispfAutoFetch.lastTwoAttendingSchool[2].beginDate).format('MM/DD/YYYY') : ''}
    ${(this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? ' to ' + moment(this.eeispfAutoFetch.lastTwoAttendingSchool[2].endDate).format('MM/DD/YYYY') : ''}`;


      this.eeispf.pre_schoolOriginDatesAttendedFrom =
        (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? new Date(this.eeispfAutoFetch.lastTwoAttendingSchool[2].beginDate) : null;
      this.eeispf.pre_schoolOriginDatesAttendedTo =
        (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? new Date(this.eeispfAutoFetch.lastTwoAttendingSchool[2].endDate) : null;




      this.eeispf.educationPlacementDates =
        `${(this.eeispfAutoFetch.placementDetails.length > 2) ? new Date(this.eeispfAutoFetch.placementDetails[2].beginDate) : ''}

      ${(this.eeispfAutoFetch.placementDetails.length > 2) ? ' to ' + moment(this.eeispfAutoFetch.placementDetails[2].endDate).format('MM/DD/YYYY') : ''}`;

      this.eeispf.p_DOPBeginDate = (this.eeispfAutoFetch.placementDetails.length > 2) ? new Date(this.eeispfAutoFetch.placementDetails[2].beginDate) : null;
      if (this.eeispfAutoFetch.placementDetails.length > 2) {
        if (this.eeispfAutoFetch.placementDetails[2].endDate === null) {
          this.eeispf.p_DOPEndDate = null;
        } else {
          this.eeispf.p_DOPEndDate = (this.eeispfAutoFetch.placementDetails.length > 2) ? new Date(this.eeispfAutoFetch.placementDetails[2].endDate) : null;
        }
      }



      if (this.eeispfAutoFetch.placementDetails.length > 2) {
        this.eeispf.educationPlacementAddress = `${this.eeispfAutoFetch.placementDetails[2].address1}, ${this.eeispfAutoFetch.placementDetails[2].city},  ${this.eeispfAutoFetch.placementDetails[2].state}, ${this.eeispfAutoFetch.placementDetails[2].zipcode}`
      }
      this.eeispf.edcautionPlacementPhone = (this.eeispfAutoFetch.placementDetails.length > 2) ? this.eeispfAutoFetch.placementDetails[2].phone : null;
      this.eeispf.educationEmail = (this.eeispfAutoFetch.placementDetails.length > 2) ? this.eeispfAutoFetch.placementDetails[2].Email : null;

      this.eeispf.usdName = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[0]) ? this.eeispfAutoFetch.lastTwoAttendingSchool[0].usd : null;
      this.eeispf.orgin_usdName = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[1]) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].usd : null;
      this.eeispf.pre_usdName = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[2]) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].usd : null
      if (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 0) {
        this.UsdName = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[0].usd) ? this.eeispfAutoFetch.lastTwoAttendingSchool[0].usd.usdName : null;
        this.UsdNumber = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[0].usd) ? this.eeispfAutoFetch.lastTwoAttendingSchool[0].usd.usd : null;
        this.eeispf.essa1_phoneNumber = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[0].usd) ? this.eeispfAutoFetch.lastTwoAttendingSchool[0].usd.phone : null;
        this.eeispf.essa1_email = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[0].usd) ? this.eeispfAutoFetch.lastTwoAttendingSchool[0].usd.contactEmail : null;
        this.eeispf.essa = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[0].usd) ? this.eeispfAutoFetch.lastTwoAttendingSchool[0].usd.contactName : null;

      }
      if (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) {
        this.orgin_usdName = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[1].usd) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].usd.usdName : null;
        this.Usd_Orgin_Number = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[1].usd) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].usd.usd : null;
        this.schoolOriginName = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].schoolName : null;
        this.eeispf.schoolOriginPhoneOREmail = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[1].usd) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].usd.phone : null;
        this.eeispf.essa2_email = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[1].usd) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].usd.contactEmail : null;
        this.eeispf.schoolOriginESSA = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[1].usd) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].usd.contactName : null;
      }
      if (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) {
        this.pre_usdName = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[2].usd) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].usd.usdName : null;
        this.usd_pre_Number = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[2].usd) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].usd.usd : null;
        this.previousSchoolName = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].schoolName : null;

        this.eeispf.previousSchoolESSAPhoneNumber = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[2].usd) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].usd.phone : null;
        this.eeispf.previousSchoolESSA = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[2].usd) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].usd.contactName : null;
        this.eeispf.previousSchoolESSAEmail = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[2].usd) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].usd.contactEmail : null;
      }

      this.UsdName = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[0].usd) ? this.eeispfAutoFetch.lastTwoAttendingSchool[0].usd.usdName : null;


      this.eeispf.usdNumber = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[0]) ? this.eeispfAutoFetch.lastTwoAttendingSchool[0].usd : null;
      this.eeispf.usd_orgin_Number = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[1]) ? this.eeispfAutoFetch.lastTwoAttendingSchool[1].usd : null;
      this.eeispf.usd_pre_Number = !isNullOrUndefined(this.eeispfAutoFetch.lastTwoAttendingSchool[2]) ? this.eeispfAutoFetch.lastTwoAttendingSchool[2].usd : null

      /** Part B Section 6 - Agency chanin of informations */
      for (let c = 0; c < this.eeispfAutoFetch.clientCaseTeamDetails.length; c++) {
        switch (this.eeispfAutoFetch.clientCaseTeamDetails[c].personType) {
          case 'Case Manager':
            console.log("this.eeispfAutoFetch.clientCaseTeamDetails>>>", this.eeispfAutoFetch.clientCaseTeamDetails);
            this.eeispf.managerName = `${this.eeispfAutoFetch.clientCaseTeamDetails[c].lastName}, ${this.eeispfAutoFetch.clientCaseTeamDetails[c].firstName}`;
            this.eeispfAutoFetch.clientCaseTeamDetails[c].address = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].address) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].address + "," : "";
            this.eeispfAutoFetch.clientCaseTeamDetails[c].city = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].city) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].city + "," : "";
            this.eeispfAutoFetch.clientCaseTeamDetails[c].state = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].state) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].state + "," : "";
            this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode + "," : "";

            this.eeispf.managerAddress = `${this.eeispfAutoFetch.clientCaseTeamDetails[c].address} ${this.eeispfAutoFetch.clientCaseTeamDetails[c].city} ${this.eeispfAutoFetch.clientCaseTeamDetails[c].state} ${this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode}`;
            this.eeispf.managerPhone = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].cellPhone) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].cellPhone : null;
            this.eeispf.managerOfficePhone = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].workPhone) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].workPhone : null;
            this.eeispf.managerOfficePhone_extension = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].extension) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].extension : null;
            this.eeispf.managerEmail = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].email) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].email : null;
            this.eeispf.managerFax = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].fax) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].fax : null;

            break;
          case 'Supervisor':
            this.eeispfAutoFetch.clientCaseTeamDetails[c].lastName = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].lastName) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].lastName + "," : "";
            this.eeispfAutoFetch.clientCaseTeamDetails[c].firstName = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].firstName) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].firstName : "";
            this.eeispf.supervisorName = `${this.eeispfAutoFetch.clientCaseTeamDetails[c].lastName} ${this.eeispfAutoFetch.clientCaseTeamDetails[c].firstName}`;

            this.eeispf.supervisorPhone = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].cellPhone) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].cellPhone : null;
            this.eeispfAutoFetch.clientCaseTeamDetails[c].address = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].address) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].address + "," : "";
            this.eeispfAutoFetch.clientCaseTeamDetails[c].city = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].city) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].city + "," : "";
            this.eeispfAutoFetch.clientCaseTeamDetails[c].state = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].state) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].state + "," : "";
            this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode + "," : "";

            this.eeispf.supervisorAddress = `${this.eeispfAutoFetch.clientCaseTeamDetails[c].address} ${this.eeispfAutoFetch.clientCaseTeamDetails[c].city} ${this.eeispfAutoFetch.clientCaseTeamDetails[c].state} ${this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode}`;
            this.eeispf.supervisorOfficePhone = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].workPhone) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].workPhone : null;
            this.eeispf.supervisorOfficePhone_extension = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].extension) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].extension : null;
            this.eeispf.supervisorEmail = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].email) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].email : null;
            this.eeispf.supervisorFax = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].fax) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].fax : null;

            break;
          case 'DCF Liaison':
            this.eeispf.fosterCareName = `${this.eeispfAutoFetch.clientCaseTeamDetails[c].lastName}, ${this.eeispfAutoFetch.clientCaseTeamDetails[c].firstName}`;
            this.eeispfAutoFetch.clientCaseTeamDetails[c].address = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].address) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].address + "," : "";
            this.eeispfAutoFetch.clientCaseTeamDetails[c].city = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].city) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].city + "," : "";
            this.eeispfAutoFetch.clientCaseTeamDetails[c].state = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].state) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].state + "," : "";
            this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode + "," : "";

            this.eeispf.fosterCareAddress = `${this.eeispfAutoFetch.clientCaseTeamDetails[c].address} ${this.eeispfAutoFetch.clientCaseTeamDetails[c].city} ${this.eeispfAutoFetch.clientCaseTeamDetails[c].state} ${this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode}`;
            this.eeispf.fosterCarePhone = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].cellPhone) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].cellPhone : null;
            this.eeispf.fosterCareOfficePhone = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].workPhone) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].workPhone : null;
            this.eeispf.fosterCareOfficePhone_extension = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].extension) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].extension : null;
            this.eeispf.fosterCareEmail = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].email) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].email : null;
            this.eeispf.fosterCareFax = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].fax) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].fax : null;
            break;
          case 'Administration':
            this.eeispf.administratorName = `${this.eeispfAutoFetch.clientCaseTeamDetails[c].lastName}, ${this.eeispfAutoFetch.clientCaseTeamDetails[c].firstName}`;
            this.eeispf.administratorPhone = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].cellPhone) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].cellPhone : null;
            this.eeispf.administratorOfficePhone = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].workPhone) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].workPhone : null;
            this.eeispf.administratorEmail = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].email) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].email : null;
            this.eeispf.administratorFax = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].fax) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].fax : null;
            break;
          case 'Family Support Worker':
            this.eeispf.familySupportWorkerName = `${this.eeispfAutoFetch.clientCaseTeamDetails[c].lastName}, ${this.eeispfAutoFetch.clientCaseTeamDetails[c].firstName}`;

            this.eeispfAutoFetch.clientCaseTeamDetails[c].address = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].address) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].address + "," : "";
            this.eeispfAutoFetch.clientCaseTeamDetails[c].city = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].city) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].city + "," : "";
            this.eeispfAutoFetch.clientCaseTeamDetails[c].state = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].state) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].state + "," : "";
            this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode + "," : "";

            this.eeispf.familySupWorkAddress = `${this.eeispfAutoFetch.clientCaseTeamDetails[c].address} ${this.eeispfAutoFetch.clientCaseTeamDetails[c].city} ${this.eeispfAutoFetch.clientCaseTeamDetails[c].state} ${this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode}`;
            this.eeispf.familySupWorkPhone = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].cellPhone) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].cellPhone : null;
            this.eeispf.familySupWorkOfficePhone = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].workPhone) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].workPhone : null;
            this.eeispf.familySupWorkOfficePhone_extension = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].extension) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].extension : null;
            this.eeispf.familySupWorkEmail = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].email) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].email : null;
            this.eeispf.familySupWorkFax = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].fax) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].fax : null;
            break;
          case 'Education Coordinator':
            this.eeispf.eduCoordName = `${this.eeispfAutoFetch.clientCaseTeamDetails[c].lastName}, ${this.eeispfAutoFetch.clientCaseTeamDetails[c].firstName}`;

            this.eeispfAutoFetch.clientCaseTeamDetails[c].address = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].address) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].address + "," : "";
            this.eeispfAutoFetch.clientCaseTeamDetails[c].city = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].city) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].city + "," : "";
            this.eeispfAutoFetch.clientCaseTeamDetails[c].state = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].state) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].state + "," : "";
            this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode + "," : "";

            this.eeispf.eduCoordAddress = `${this.eeispfAutoFetch.clientCaseTeamDetails[c].address} ${this.eeispfAutoFetch.clientCaseTeamDetails[c].city} ${this.eeispfAutoFetch.clientCaseTeamDetails[c].state} ${this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode}`;
            this.eeispf.eduCoordPhone = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].cellPhone) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].cellPhone : null;
            this.eeispf.eduCoordOfficePhone = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].workPhone) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].workPhone : null;
            this.eeispf.eduCoordOfficePhone_extension = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].extension) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].extension : null;
            this.eeispf.eduCoordEmail = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].email) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].email : null;
            this.eeispf.eduCoordFax = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].fax) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].fax : null;
            break;

          case 'DCF Worker':
            this.eeispf.dcfFostName = `${this.eeispfAutoFetch.clientCaseTeamDetails[c].lastName}, ${this.eeispfAutoFetch.clientCaseTeamDetails[c].firstName}`;

            this.eeispfAutoFetch.clientCaseTeamDetails[c].address = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].address) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].address + "," : "";
            this.eeispfAutoFetch.clientCaseTeamDetails[c].city = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].city) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].city + "," : "";
            this.eeispfAutoFetch.clientCaseTeamDetails[c].state = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].state) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].state + "," : "";
            this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode + "," : "";

            this.eeispf.dcfFostAddress = `${this.eeispfAutoFetch.clientCaseTeamDetails[c].address} ${this.eeispfAutoFetch.clientCaseTeamDetails[c].city} ${this.eeispfAutoFetch.clientCaseTeamDetails[c].state} ${this.eeispfAutoFetch.clientCaseTeamDetails[c].zipcode}`;
            this.eeispf.dcfFostPhone = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].cellPhone) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].cellPhone : null;
            this.eeispf.dcfFostOfficePhone = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].workPhone) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].workPhone : null;
            this.eeispf.dcfFostEmail = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].email) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].email : null;
            this.eeispf.dcfFostFax = !isNullOrUndefined(this.eeispfAutoFetch.clientCaseTeamDetails[c].fax) ? this.eeispfAutoFetch.clientCaseTeamDetails[c].fax : null;
            break;

        }
      }

      /** Section II: School in which child is being enrolled */
      // this.eeispf.schoolName = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 0) ? this.eeispfAutoFetch.lastTwoAttendingSchool[0] : null;
      this.schoolName = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 0) ? this.eeispfAutoFetch.lastTwoAttendingSchool[0].schoolName : null;
      if (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 0) {
        this.eeispf.schoolAddress = `${this.eeispfAutoFetch.lastTwoAttendingSchool[0].address}, ${this.eeispfAutoFetch.lastTwoAttendingSchool[0].city}, ${this.eeispfAutoFetch.lastTwoAttendingSchool[0].state}, ${this.eeispfAutoFetch.lastTwoAttendingSchool[0].zipcode}`;
      }

      this.eeispf.schoolPhone = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 0) ? this.eeispfAutoFetch.lastTwoAttendingSchool[0].phone : null;
      this.eeispf.schoolMailORFax = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 0) ? this.eeispfAutoFetch.lastTwoAttendingSchool[0].registrarEmail : null;
      this.eeispf.schoolbuildName = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 0) ? this.eeispfAutoFetch.lastTwoAttendingSchool[0].eSSAPointOfContact : null;
      this.eeispf.schoolBuildEmail = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 0) ? this.eeispfAutoFetch.lastTwoAttendingSchool[0].registrarEmail : null;
      this.eeispf.schoolFax = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 0) ? this.eeispfAutoFetch.lastTwoAttendingSchool[0].fax : null;
      // this.enrollmentDate = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 0) ? new Date(this.eeispfAutoFetch.lastTwoAttendingSchool[0].beginDate) : null;
      this.eeispf.enrollmentDate = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 0) ? new Date(this.eeispfAutoFetch.lastTwoAttendingSchool[0].beginDate) : null;;
      /** Family details */
      this.eeispfAutoFetch.clientFamilyMemberDetails.map((item: familyMemeber, index: any) => {
        if (item.personType === 'Mother') {
          this.eeispf.motherName = item.familyMemberName;

          let motherAddress = !isNullOrUndefined(item.address) ? item.address : "";
          let motherCity = !isNullOrUndefined(item.city) ? item.city : "";
          let motherState = !isNullOrUndefined(item.state) ? item.state : "";
          let motherZipcode = !isNullOrUndefined(item.zipcode) ? item.zipcode : "";

          this.eeispf.addressParent =
            `${motherAddress}, ${motherCity}, ${motherState}, ${motherZipcode}`;
          this.eeispf.phoneNoParent = item.homePh;
          this.eeispf.emailParent = item.email;
        }
        else if (item.personType === 'Father') {
          this.eeispf.fatherName = item.familyMemberName;


          let fatherddress = !isNullOrUndefined(item.address) ? item.address : "";
          let fatherCity = !isNullOrUndefined(item.city) ? item.city : "";
          let fatherState = !isNullOrUndefined(item.state) ? item.state : "";
          let fatherZipcode = !isNullOrUndefined(item.zipcode) ? item.zipcode : "";


          this.eeispf.fatherAddress =
            `${fatherddress}, ${fatherCity}, ${fatherState}, ${fatherZipcode}`;
          this.eeispf.fatherPhoneNumber = item.homePh;
          this.eeispf.fatherEmail = item.email;
        }
        // this.schoolName = this.eeispf.schoolOriginName;
      });
      this.eeispf.schoolName = {
        Address: this.eeispf.schoolAddress,
        BeginDate: null,
        BuildingNumber: null,
        ChangedBy: null,
        ChangedDate: null,
        CityID: null,
        CountyID: null,
        CreatedDate: null,
        ESSAPointOfContact: null,
        EndDate: null,
        EnteredBy: null,
        EnteredDate: null,
        Fax: null,
        GPSAddress: null,
        GPSCity: null,
        GPSLatitude: null,
        GPSLongitude: null,
        GPSState: null,
        GPSValidated: null,
        GPSXML: null,
        GPSZipcode: null,
        IsActive: null,
        IsDoNotSendToPOC: null,
        IsMultiState: null,
        IsPrivate: null,
        LastModifiedDate: null,
        Legacy_SchoolID: null,
        Notes: null,
        Nurse_FirstName: null,
        Nurse_LastName: null,
        Nurse_MI: null,
        Phone: null,
        Principal_FirstName: null,
        Principal_LastName: null,
        Principal_MI: null,
        RegistrarEmail: null,
        SchoolID: null,
        SchoolName: this.schoolName,
        StateID: null,
        USD: null,
        UpdatedDate: null,
        VicePrincipal_FirstName: null,
        VicePrincipal_LastName: null,
        VicePrincipal_MI: null,
        ZipcodeID: null,
        clientID: null,
        completedAddress: null,
        isDeleted: null,
        usdname: null,
      }
    }
  }

  /** Autofecth data in read or edit mode */
  readonlyData() {
    let req = {
      referralID: this.routerReferralID,
      clientID: this.routerClientID
    }
    this._opencard.eeispfEmails(req).then((data: any) => {
      this.eeispfAutoFetch.lastTwoAttendingSchool = data.lastTwoAttendingSchool;
      this.eeispfAutoFetch.placementDetails = data.placementDetail;
    }).then(() => {
      this.getRecById();
    }).then(() => {
      // this.enrollmentDate = (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 0) ? moment(this.eeispfAutoFetch.lastTwoAttendingSchool[0].beginDate).format('MM/DD/YYYY') : null;

      this.schoolOriginDatesAttended =
        `${(this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? moment(this.eeispfAutoFetch.lastTwoAttendingSchool[1].beginDate).format('MM/DD/YYYY') : ''}
       ${(this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? ' to ' + moment(this.eeispfAutoFetch.lastTwoAttendingSchool[1].endDate).format('MM/DD/YYYY') : ''}`;
      this.eeispf.schoolOriginDatesAttendedFrom =
        (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? new Date(this.eeispfAutoFetch.lastTwoAttendingSchool[1].beginDate) : '';
      this.eeispf.schoolOriginDatesAttendedTo =
        (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 1) ? new Date(this.eeispfAutoFetch.lastTwoAttendingSchool[1].endDate) : '';
      this.eeispf.DOPBeginDate =
        (this.eeispfAutoFetch.placementDetails.length > 1) ? new Date(this.eeispfAutoFetch.placementDetails[0].beginDate) : '';
      this.eeispf.DOPEndDate =
        (this.eeispfAutoFetch.placementDetails.length > 1) ? new Date(this.eeispfAutoFetch.placementDetails[0].endDate) : '';
      this.eeispf.datesOfPlacement =
        `${(this.eeispfAutoFetch.placementDetails.length > 1) ? new Date(this.eeispfAutoFetch.placementDetails[0].beginDate) : ''};
    ${(this.eeispfAutoFetch.placementDetails.length > 1) ? ' to ' + moment(this.eeispfAutoFetch.placementDetails[1].endDate).format('MM/DD/YYYY') : ''}`

      this.eeispf.educationPlacementDates =
        `${(this.eeispfAutoFetch.placementDetails.length > 2) ? moment(this.eeispfAutoFetch.placementDetails[2].beginDate).format('MM/DD/YYYY') : ''}

    ${(this.eeispfAutoFetch.placementDetails.length > 2) ? ' to ' + moment(this.eeispfAutoFetch.placementDetails[2].endDate).format('MM/DD/YYYY') : ''}`




      this.previousSchoolDatesAttended =
        `${(this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? moment(this.eeispfAutoFetch.lastTwoAttendingSchool[2].beginDate).format('MM/DD/YYYY') : ''}
         ${(this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? 'to ' + moment(this.eeispfAutoFetch.lastTwoAttendingSchool[2].endDate).format('MM/DD/YYYY') : ''}`;

      this.eeispf.pre_schoolOriginDatesAttendedFrom =
        (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? new Date(this.eeispfAutoFetch.lastTwoAttendingSchool[2].beginDate) : null;
      this.eeispf.pre_schoolOriginDatesAttendedTo =
        (this.eeispfAutoFetch.lastTwoAttendingSchool.length > 2) ? new Date(this.eeispfAutoFetch.lastTwoAttendingSchool[2].endDate) : null;

    })

  }

  async promptMessage() {

    const inputOptions = {
      'withDownload': 'Yes',
      'withoutDownload': 'No'
    }

    const { value: finalizeOption } = await Swal.fire({
      title: 'Do you want the finalized form to auto download?',
      input: 'radio',
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return 'Please choose any one option to finalize'
        }
      }
    })
    if (finalizeOption == 'withDownload') {
      this.isFinalizeWithDownload = true;
    }
    else if (finalizeOption == 'withoutDownload') {
      this.isFinalizeWithDownload = false;
    }
  }

  onCheck(event: any, selectedLabel: string) {
    if (selectedLabel === 'IEP') {

    } else if (selectedLabel === '504') {

    } else {

    }
  }
  textAreaAdjust(idTag, element) {
    let textArea = document.getElementById(idTag);
    // console.log("textArea>>>>", textArea);
    // console.log("textArea.scrollHeight>>>>", textArea.scrollHeight);
    // console.log("textArea.scrollHeight>>>>", textArea);
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
    // element.style.height = "1px";
    // element.style.height = (25 + element.scrollHeight) + "px";
  };
  schollsList = [];
  usdLists = [];
  usdNames = [];
  getSchollsUIDs(event, label) {
    let req;
    if (label === 'usdNum') {
      req = {
        "Object": "usd",
        "value": event.query,
        // "endPagination": 50,
        // "beginPagination": 1,
        // "sort": { "column": "2", "mode": "asc" }
      }
    } else {
      req = {
        "Object": "usdName",
        "value": event.query,
      }
    }
    this._educationEnroll.defaultUsdUsdName(req).then((data: any) => {
      // data.usdList.sort(function (a, b) { return a.usd - b.usd })
      this.usdLists = data.dropDown;
    })
  };
  getScholls_Name(event) {
    var req = {
      "Object": "usdName",
      "value": event.query,
    }
    this._educationEnroll.defaultUsdUsdName(req).then((data: any) => {
      this.usdNames = data.dropDown;
    })
  }
  scholls_origin_List = [];
  scholls_previous_List = [];
  getSchollsName(event) {
    if (this.eeispf.usdName === null && this.eeispf.usdNumber === null) {
      this.UsdNumber = null;
    } if (this.eeispf.usdName === "" && this.eeispf.usdNumber === null) {
      this.UsdNumber = null;
    } if (this.eeispf.usdName === null && this.eeispf.usdNumber === "") {
      this.UsdNumber = null;
    } if (this.eeispf.usdName === "" && this.eeispf.usdNumber === "") {
      this.UsdNumber = null;
    }
    var req = {
      "schoolName": event.query,
      "usd": this.UsdNumber,
      "endPagination": 10,
      "beginPagination": 1,
      "sort": { "column": "1", "mode": "asc" }
    }
    // var req = { "referralID": parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey(), "usd": event.query }
    this._opencard.getSchoolLists(req).then((data: any) => {
      this.schollsList = data.schoolList;
    })
  };
  getScholls_origin_Name(event) {
    if (this.eeispf.usd_orgin_Number === null && this.eeispf.orgin_usdName === null) {
      this.Usd_Orgin_Number = null;
    }
    if (this.eeispf.usd_orgin_Number === "" && this.eeispf.orgin_usdName === "") {
      this.Usd_Orgin_Number = null;
    }
    if (this.eeispf.usd_orgin_Number === null && this.eeispf.orgin_usdName === "") {
      this.Usd_Orgin_Number = null;
    } if (this.eeispf.usd_orgin_Number === "" && this.eeispf.orgin_usdName === null) {
      this.Usd_Orgin_Number = null;
    }
    var req = {
      "schoolName": event.query,
      "usd": this.Usd_Orgin_Number,
      "endPagination": 10,
      "beginPagination": 1,
      "sort": { "column": "1", "mode": "asc" }
    }
    // var req = { "referralID": parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey(), "usd": event.query }
    this._opencard.getSchoolLists(req).then((data: any) => {
      this.scholls_origin_List = data.schoolList;
    })
  };
  getScholls_previos_Name(event) {
    if (this.eeispf.pre_usdName === null && this.eeispf.usd_pre_Number === null) {
      this.usd_pre_Number = null;
    }
    if (this.eeispf.pre_usdName === null && this.eeispf.usd_pre_Number === "") {
      this.usd_pre_Number = null;
    }
    if (this.eeispf.pre_usdName === "" && this.eeispf.usd_pre_Number === null) {
      this.usd_pre_Number = null;
    }
    if (this.eeispf.pre_usdName === "" && this.eeispf.usd_pre_Number === "") {
      this.usd_pre_Number = null;
    }
    var req = {
      "schoolName": event.query,
      "usd": this.usd_pre_Number,
      "endPagination": 10,
      "beginPagination": 1,
      "sort": { "column": "1", "mode": "asc" }
    }
    // var req = { "referralID": parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey(), "usd": event.query }
    this._opencard.getSchoolLists(req).then((data: any) => {
      this.scholls_previous_List = data.schoolList;
    })
  };
  UsdName: any;
  schoolName: any;
  getSchoolInfo(event) {
    console.log(event.ESSAPointOfContact);
    console.log(event.RegistrarEmail);
    this.eeispf.schoolbuildName = event.ESSAPointOfContact;
    this.eeispf.schoolBuildEmail = event.RegistrarEmail;

    this.schoolName = event.SchoolName;
    this.eeispf.schoolAddress = event.completedAddress;
    this.eeispf.schoolPhone = event.Phone;
    this.eeispf.essa = event.ESSAPointOfContact;
    this.eeispf.schoolFax = event.Fax;

    this.eeispf.schoolMailORFax = event.RegistrarEmail;
    this.schoolID1 = event.RegistrarEmail;
    this.eeispf.schoolID1 = this.schoolID1;

    var Req = {
      "usd": event.USD
    }
    this._educationEnroll.getUSD(Req).then((data) => {
      if (data.responseStatus) {
        if (!this.isUSD_number_Text) {
          this.eeispf.usdNumber = data.dropDown;
        }
        if (!this.isUSD_Text) {
          this.eeispf.usdName = data.dropDown;
        }
        // this.eeispf.usdName = data.dropDown;
        // this.eeispf.usdNumber = data.dropDown;
        this.UsdNumber = data.dropDown.usd;
        this.eeispf.essa1_phoneNumber = data.dropDown.phone;
        this.eeispf.essa1_email = data.dropDown.contactEmail;
        this.eeispf.essa = data.dropDown.contactName;
      } else {
        this.eeispf.usdName = null;
        this.UsdNumber = null;
        this.eeispf.usdNumber = null;
        this.eeispf.essa1_phoneNumber = null;
        this.eeispf.essa1_email = null;
        this.eeispf.essa = null;
      }
    })
  };
  schoolOriginName: any;
  getSchoolOriginInfo(event) {
    this.eeispf.school2buildName = event.ESSAPointOfContact;
    this.eeispf.school2BuildEmail = event.RegistrarEmail;

    this.eeispf.schoolOriginAddress = event.completedAddress;
    this.eeispf.schoolOriginPhone = event.Phone;
    this.eeispf.schoolFaxEmail = event.RegistrarEmail;
    this.eeispf.schoolOriginESSA = event.ESSAPointOfContact;
    this.eeispf.school1Fax = event.Fax
    this.schoolOriginName = event.SchoolName;
    this.schoolID2 = event.RegistrarEmail;
    this.eeispf.schoolID2 = this.schoolID2;
    var Req = {
      "usd": event.USD
    }
    this._educationEnroll.getUSD(Req).then((data) => {
      if (data.responseStatus) {

        if (!this.isUSD_orgin_number_Text) {
          this.eeispf.usd_orgin_Number = data.dropDown;
        }
        if (!this.isOriginUSD_Text) {
          this.eeispf.orgin_usdName = data.dropDown;
        }

        // this.eeispf.orgin_usdName = data.dropDown;
        // this.eeispf.usd_orgin_Number = data.dropDown;
        this.Usd_Orgin_Number = data.dropDown.usd;
        this.eeispf.schoolOriginPhoneOREmail = data.dropDown.phone;
        this.eeispf.essa2_email = data.dropDown.contactEmail;
        this.eeispf.schoolOriginESSA = data.dropDown.contactName;
      } else {
        this.eeispf.orgin_usdName = null;
        this.eeispf.usd_orgin_Number = null;
        this.Usd_Orgin_Number = null;
        this.eeispf.schoolOriginPhoneOREmail = null;
        this.eeispf.essa2_email = null;
        this.eeispf.schoolOriginESSA = null;
      }

    })
  }
  previousSchoolName: any;
  getSchoolPreviousInfo(event) {
    this.eeispf.school3buildName = event.ESSAPointOfContact;
    this.eeispf.school3BuildEmail = event.RegistrarEmail;
    this.eeispf.previousSchoolAddress = event.completedAddress;
    this.eeispf.previousSchoolPhoneNumber = event.Phone;
    this.eeispf.previousSchoolFaxOrEmail = event.Fax;
    this.eeispf.previousSchoolFax = event.Fax;
    this.eeispf.previousSchoolEmail = event.RegistrarEmail;
    this.previousSchoolName = event.SchoolName;
    var Req = {
      "usd": event.USD
    }
    this._educationEnroll.getUSD(Req).then((data) => {
      if (data.responseStatus) {

        if (!this.isUsdNumberText) {
          this.eeispf.usd_pre_Number = data.dropDown;
        }
        if (!this.isPreUsdNameText) {
          this.eeispf.pre_usdName = data.dropDown;
        }

        // this.eeispf.pre_usdName = data.dropDown;
        // this.eeispf.usd_pre_Number = data.dropDown;
        this.eeispf.previousSchoolESSAEmail = data.dropDown.contactEmail;
        this.eeispf.previousSchoolESSAPhoneNumber = data.dropDown.phone;
        this.eeispf.previousSchoolESSA = data.dropDown.contactName;
        this.usd_pre_Number = data.dropDown.usd;
      } else {
        this.eeispf.pre_usdName = null;
        this.eeispf.usd_pre_Number = null;
        this.eeispf.previousSchoolESSAEmail = null;
        this.eeispf.previousSchoolESSAPhoneNumber = null;
        this.eeispf.previousSchoolESSA = null;
        this.usd_pre_Number = null;
      }

    })
  }

  showOtherText = false;
  otherCheck(event) {
    this.showOtherText = event;
  };
  getPreviousEducation() {
    var req = { "referralID": this.routerReferralID }
    this._opencard.getPreviousSchoolLists(req).then((data: any) => {
      if (data.responseStatus) {
        this.eeispf.safetyPrecautions = data.data.safetyPrecautions;
        // this.eeispf.homeCareReasons = data.data.homeCareReasons;
        this.eeispf.otherInformation = data.data.otherInformation;
        this.eeispf.healthConditions = data.data.healthConditions;
        this.eeispf.explainIfYes = data.data.explainIfYes;
        // this.eeispf.currentMedications = data.data.currentMedications;
        this.eeispf.isIEPYES = this.getBooleanValue(data.data.isIEPYES);
        this.eeispf.isIEPNO = this.getBooleanValue(data.data.isIEPNO);
        this.eeispf.isEvaluationInProgress = this.getBooleanValue(data.data.isEvaluationInProgress);
        this.eeispf.isIEPUnkown = this.getBooleanValue(data.data.isIEPUnkown);
        this.eeispf.isIEP504YES = this.getBooleanValue(data.data.isIEP504YES);
        this.eeispf.isIEP504NO = this.getBooleanValue(data.data.isIEP504NO);
        this.eeispf.isIEPUnkown1 = this.getBooleanValue(data.data.isIEPUnkown1);
        this.eeispf.isIEPschoolYES = this.getBooleanValue(data.data.isIEPschoolYES);
        this.eeispf.isIEPschoolNo = this.getBooleanValue(data.data.isIEPschoolNo);
        this.eeispf.isIEPschoolUnknown = this.getBooleanValue(data.data.isIEPschoolUnknown);
        this.eeispf.isIEPsuspendYES = this.getBooleanValue(data.data.isIEPsuspendYES);
        this.eeispf.isIEPsuspendNo = this.getBooleanValue(data.data.isIEPsuspendNo);
        this.eeispf.isStudentExpelledYes = this.getBooleanValue(data.data.isStudentExpelledYes);
        this.eeispf.isStudentExpelledNo = this.getBooleanValue(data.data.isStudentExpelledNo);
        // this.eeispf.placementName = data.data.healthConditions;
        if (this._router.url.includes('/reintegration/referral/opencard/school/eeispf/new')) {
          this.redirectSave(this.eeispf);
        }
      } else {
        // this.eeispf.placementName = data.data.healthConditions;
        if (this._router.url.includes('/reintegration/referral/opencard/school/eeispf/new')) {
          this.redirectSave(this.eeispf);
        }
      }

    })
  };
  getBooleanValue(val) {
    if (val === 'true') {
      return true;
    } else {
      return false;
    }
  }
  getMedicationList() {
    var mediacatinLists = [];
    let pclientId = this.routerClientID;
    var requestObject = {
      clientId: pclientId
    };
    this._opencard.medicationList(requestObject).then((data: any) => {
      // this.eeispf.currentMedications = data.medications;
    })
  };
  // getMailList() {
  //   this._opencard.getEduEnrollMail().then((data: any) => {
  //     this.emailAddressOne = data.ComplianceTech_Email;
  //     this.emailAddressTwo = data.EducationCoordinator_Email;
  //     this.emailAddressThree = data.DCFFosterCareAdministrator_Email;
  //   })
  // }

  getIsDtaThere(data) {
    if (data === undefined || data === null || data === "") {
      return {
        'border': '1px solid gray',
        'width': '100% !important',
        'height': '75%',
        'padding': '13px',
      };
    } else {
      return {
        'border': '1px solid gray',
        'padding': '5px',
        'width': 'fit-content !important',
      };
    }
  };
  UsdNumber: any;
  Usd_Orgin_Number = null;
  USD_id_Change(event) {
    if (!this.isUSD_number_Text) {
      this.eeispf.usdNumber = event;
    }

    this.UsdNumber = event.usd;
    this.UsdName = event.usdName;
    this.eeispf.essa1_phoneNumber = event.phone;
    this.eeispf.essa1_email = event.contactEmail;
    this.eeispf.essa = event.contactName;

  };
  USD_orgin_id_Change(event) {
    if (!this.isUSD_orgin_number_Text) {
      this.eeispf.usd_orgin_Number = event;
    }

    this.Usd_Orgin_Number = event.usd;
    this.orgin_usdName = event.usdName;
    this.eeispf.schoolOriginPhoneOREmail = event.phone;
    this.eeispf.essa2_email = event.contactEmail;
    this.eeispf.schoolOriginESSA = event.contactName;
  }
  USD_name_Change(event) {
    if (!this.isUSD_Text) {
      this.eeispf.usdName = event;
    }
    this.UsdName = event.usdName;
    this.UsdNumber = event.usd;
    this.eeispf.essa1_phoneNumber = event.phone;
    this.eeispf.essa1_email = event.contactEmail;
    this.eeispf.essa = event.contactName;
  }
  USD_name_orgin_Change(event) {
    if (!this.isOriginUSD_Text) {
      this.eeispf.orgin_usdName = event;
    }
    this.orgin_usdName = event.usdName;
    this.Usd_Orgin_Number = event.usd;
    this.eeispf.schoolOriginPhoneOREmail = event.phone;
    this.eeispf.essa2_email = event.contactEmail;
    this.eeispf.schoolOriginESSA = event.contactName;
  };
  USD_pre_id_Change(event) {
    if (!this.isUsdNumberText) {
      this.eeispf.usd_pre_Number = event;
    }
    this.usd_pre_Number = event.usd;
    this.pre_usdName = event.usdName;
    this.eeispf.previousSchoolESSAEmail = event.contactEmail;
    this.eeispf.previousSchoolESSAPhoneNumber = event.phone;
    this.eeispf.previousSchoolESSA = event.contactName;
  };
  USD_pre_name_Change(event) {
    if (!this.isPreUsdNameText) {
      this.eeispf.pre_usdName = event;
    }

    this.pre_usdName = event.usdName;
    this.usd_pre_Number = event.usd;
    this.eeispf.previousSchoolESSAEmail = event.contactEmail;
    this.eeispf.previousSchoolESSAPhoneNumber = event.phone;
    this.eeispf.previousSchoolESSA = event.contactName;
  };
  gradeName: any;
  getGradeName(event) {
    this.gradeName = event.grade;
  }
  getGrades() {
    var requestObject = {
      referralID: this.routerReferralID,
    };
    this._opencard.listAllGradeLevel(requestObject).then((data) => {
      data.clientGrade.map(ele => {
        ele.beginDateTime = new Date(ele.beginDate);
      });
      var maximumDate = new Date(Math.max(...data.clientGrade.map(e => new Date(e.beginDate))));
      var highGrade = Math.max.apply(Math, data.clientGrade.map(function (o) { return o.clientGradeID; }));
      const found = data.clientGrade.find(element => element.beginDate == this._localValues.getDateWithExt(maximumDate));

      var gradeDta = {
        createdDate: null,
        grade: found.grade,
        gradeCode: null,
        gradeID: found.clientGradeID,
        isActive: found.isActive,
        isDeleted: null,
        lastModifiedDate: null,
        sortOrder: null,
        updatedDate: null
      }
      this.eeispf.grade = gradeDta;
    });
  };
  educationLists = [];
  educationEnrolMails: any = [];
  educationEnrolMailIDS: any;
  getEducationEnrolls() {
    this.educationEnrolMails = [];
    this._opencard.getEduCordLists().then((data) => {
      data.person.map((itm) => {
        itm.fullName = itm.firstname + " " + itm.lastname + " - " + itm.email;
        this.educationEnrolMails.push(itm.email);
      });
      this.educationLists = data.person;
    });
  }

  getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
  }

  // var arr = [100, 0, 50];
  // console.log(getMaxOfArray(arr))

  coordName: any;
  fetchingAddressPhone(event) {
    this.eeispf.eduCoordPhone = event.cellPh;
    this.eeispf.eduCoordEmail = event.email;
    this.eeispf.eduCoordFax = event.fax;
    this.eeispf.eduCoordOfficePhone = event.workPh;
    this.eeispf.eduCoordAddress = event.address + ", " + event.city + ", " + event.state + " " + event.zipcode;
    this.coordName = event.firstname + " " + event.lastname + " - " + event.email;
    this.eeispf.eduCoordOfficePhone_extension = event.extension;
  }

  ngOnDestroy() {
    if (this.isRedirect) {
      this.redirectUpdate(this.eeispf);
    }
  }
  printPdf() {
    let loader = document.getElementById('loading-overlay') as HTMLElement
    loader.style.display = 'block';
    this.isPdf = true;
    Swal.fire({
      title: "Loading....",
      text: "Please Click",
      type: "warning",
    }).then((result) => {
      let currentDate = moment(new Date()).format("MM/DD/YYYY");
      var element = document.getElementById("pdf");
      var opt = {
        margin: 1,
        filename:
          "EEISPF_" + localStorage.getItem("clientName") + "_" + currentDate,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 1, dpi: 72, letterRendering: true },
        jsPDF: { unit: "cm", format: "a3", orientation: "portrait" },
        // orientation: 'landscape'
        pagebreak: { mode: "avoid-all", before: "#page2el" },
      };
      html2pdf().from(element).set(opt).save();

      loader.style.display = 'none';
      setTimeout(() => {                           //<<<---using ()=> syntax
        this.isPdf = false;
      }, 5000);

    })
  };
  allPlacementLists = [];
  all_plaementList = [];
  allPlacelists() {
    this.all_plaementList = [];
    // var req = { "referralID": parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey() };
    // this._educationEnroll.getPlacementLists(req).then(data => {
    //   this.all_plaementList = data.placementList;
    // })
    this.allPlacementLists.forEach((data) => {
      this.all_plaementList.push(data);
    });
  };

  fetchingPlacementDetails(event) {
    this.placementNames = event.placementName;
    this.eeispf.placementAddress = event.address1 + " , " + event.city + " , " + event.state + " , " + event.zipcode;
    this.eeispf.placementTelephoneNumbers = event.phone;
    // this.eeispf.placementEmailAddress = event.serviceAddress
  }
  fetching_pre_PlacementDetails(event) {
    this.previous_placementName = event.placementName;
    this.eeispf.placementAddress1 = event.address1 + " , " + event.city + " , " + event.state + " , " + event.zipcode;
    this.eeispf.placementPhone = event.phone;
    this.eeispf.DOPBeginDate = event.beginDate;
    this.eeispf.DOPEndDate = event.endDate;
    // this.eeispf.placementEmailAddress = event.serviceAddress
  }
  fetching_pre2_PlacementDetails(event) {
    this.pre_previous_placementName = event.placementName;
    this.eeispf.educationPlacementAddress = event.address1 + " , " + event.city + " , " + event.state + " , " + event.zipcode;
    this.eeispf.edcautionPlacementPhone = event.phone;
    this.eeispf.p_DOPBeginDate = event.beginDate;
    this.eeispf.p_DOPEndDate = event.endDate;
    // this.eeispf.placementEmailAddress = event.serviceAddress
  }
  get_medicat_home_hareLists() {
    let req = {
      referralID: this.routerReferralID,
      clientID: this.routerClientID
    }
    this._educationEnroll.getHomeCareAndMedicare(req).then(data => {
      if (data.responseStatus) {
        this.eeispf.homeCareReasons = data.homeCareReasons;
        this.eeispf.currentMedications = data.currentMedications;

        this.eeispf.sixth_conta_cellPhone = !isNullOrUndefined(data.sixthContact) ? data.sixthContact.cellPhone : "";
        this.eeispf.sixth_conta_email = !isNullOrUndefined(data.sixthContact) ? data.sixthContact.email : "";
        this.eeispf.sixth_conta_fax = !isNullOrUndefined(data.sixthContact) ? data.sixthContact.fax : "";
        this.eeispf.sixth_conta_fullAddress = !isNullOrUndefined(data.sixthContact) ? data.sixthContact.fullAddress : "";
        this.eeispf.sixth_conta_fullName = !isNullOrUndefined(data.sixthContact) ? data.sixthContact.fullName : "";
        this.eeispf.sixth_conta_workPhone = !isNullOrUndefined(data.sixthContact) ? data.sixthContact.workPhone : "";
        this.eeispf.sixth_conta_extension = !isNullOrUndefined(data.sixthContact) ? data.sixthContact.extension : null;
      }
    })
  };
  clearUsdNumber(event) {
    this.eeispf.usdNumber = null;
  }
  clearUsdName(event) {
    this.eeispf.usdNumber = null;
  }
  clearUsd_orginNumber(event) {
    if (this.eeispf.usdNumber == "" || this.eeispf.orgin_usdName == "") {
      this.eeispf.usd_orgin_Number = null;
      this.eeispf.orgin_usdName = null;
    }
    this.eeispf.usd_orgin_Number = null;
  }
  clearUsd_orginName(event) {
    if (this.eeispf.usdNumber == "" || this.eeispf.orgin_usdName == "") {
      this.eeispf.usd_orgin_Number = null;
      this.eeispf.orgin_usdName = null;
    }
    this.eeispf.orgin_usdName = null;
  }
  clearUsd_preNumber(event) {
    if (this.eeispf.usd_pre_Number == "" || this.eeispf.pre_usdName == "") {
      this.eeispf.usd_pre_Number = null;
      this.eeispf.pre_usdName = null;
    }
    this.eeispf.usd_pre_Number = null;
  }
  clearUsd_preName(event) {
    if (this.eeispf.usd_pre_Number == "" || this.eeispf.pre_usdName == "") {
      this.eeispf.usd_pre_Number = null;
      this.eeispf.pre_usdName = null;
    }
    this.eeispf.pre_usdName = null;
  }

  textAreaPrintChangeEvent(label, event) {
    var value = !isNullOrUndefined(event) ? event.replace(/\n/g, "<br />") : null;
    switch (label) {
      case 'print_attendees':
        this.print_attendees = value;
        break;
      case 'print_decisionSummary':
        this.print_decisionSummary = value;
        break;
      case 'print_studentName':
        this.print_studentName = value;
        break;
      case 'print_placementAddress':
        this.print_placementAddress = value;
        break;
      case 'print_fosterCareAddress':
        this.print_fosterCareAddress = value;
        break;
      case 'print_eduCoordAddress':
        this.print_eduCoordAddress = value;
        break;
      case 'print_supervisorAddress':
        this.print_supervisorAddress = value;
        break;
      case 'print_familySupWorkAddress':
        this.print_familySupWorkAddress = value;
        break;
      case 'print_familySupportWorkerName':
        this.print_familySupportWorkerName = value;
        break;
      case 'print_managerAddress':
        this.print_managerAddress = value;
        break;
      case 'print_advocateAddress':
        this.print_advocateAddress = value;
        break;
      case 'print_fatherAddress':
        this.print_fatherAddress = value;
        break;
      case 'print_fatherAdditionalDetails':
        this.print_fatherAdditionalDetails = value;
        break;
      case 'print_placementTelephoneNumbers':
        this.print_placementTelephoneNumbers = value;
        break;
      case 'print_schoolOriginAddress':
        this.print_schoolOriginAddress = value;
        break;
      case 'print_safetyPrecautions':
        this.print_safetyPrecautions = value;
        break;
      case 'print_educationPlacementAddress':
        this.print_educationPlacementAddress = value;
        break;
      case 'print_explainIfYes':
        this.print_explainIfYes = value;
        break;
      case 'print_placementAddress1':
        this.print_placementAddress1 = value;
        break;
      case 'print_previousSchoolAddress':
        this.print_previousSchoolAddress = value;
        break;
      case 'print_homeCareReasons':
        this.print_homeCareReasons = value;
        break;
      case 'print_currentMedications':
        this.print_currentMedications = value;
        break;
      case 'print_healthConditions':
        this.print_healthConditions = value;
        break;
      case 'print_otherInformation':
        this.print_otherInformation = value;
        break;
      case 'print_addressParent':
        this.print_addressParent = value;
        break;
      case 'print_additionalDetails':
        this.print_additionalDetails = value;
        break;
    }
  }
  changeTextField(label, event) {
    var isChecked = event.target.checked;
    switch (label) {
      case 'Grade':
        if (isChecked) {
          if (typeof this.eeispf.grade === 'object') {
            this.eeispf.grade = "";
          } else {
            this.eeispf.grade = "";
          }
        }
        break;
      case 'PlacementName':
        if (isChecked) {
          if (typeof this.eeispf.placementNames === 'object') {
            this.eeispf.placementNames = "";
          } else {
            this.eeispf.placementNames = "";
          }
        }
        break;
      case 'USD':
        if (isChecked) {
          if (typeof this.eeispf.usdName === 'object') {
            this.eeispf.usdName = "";
          } else {
            this.eeispf.usdName = "";
          }
        }
        break;
      case 'USD_number':
        if (isChecked) {
          if (typeof this.eeispf.usdNumber === 'object') {
            this.eeispf.usdNumber = "";
          } else {
            this.eeispf.usdNumber = "";
          }
        }
        break;

      case 'school_name':
        if (isChecked) {
          if (typeof this.eeispf.schoolName === 'object') {
            this.eeispf.schoolName = "";
          } else {
            this.eeispf.schoolName = "";
          }
        }
        break;
      case 'USD_origin_name':
        if (isChecked) {
          if (typeof this.eeispf.orgin_usdName === 'object') {
            this.eeispf.orgin_usdName = "";
          } else {
            this.eeispf.orgin_usdName = "";
          }
        }
        break;
      case 'USD_origin_number':
        if (isChecked) {
          if (typeof this.eeispf.usd_orgin_Number === 'object') {
            this.eeispf.usd_orgin_Number = "";
          } else {
            this.eeispf.usd_orgin_Number = "";
          }
        }
        break;
      case 'previousPlacementName':
        if (isChecked) {
          if (typeof this.eeispf.placementName === 'object') {
            this.eeispf.placementName = "";
          } else {
            this.eeispf.placementName = "";
          }
        }
        break;
      case 'preUsdName':
        if (isChecked) {
          if (typeof this.eeispf.pre_usdName === 'object') {
            this.eeispf.pre_usdName = "";
          } else {
            this.eeispf.pre_usdName = "";
          }
        }
        break;
      case 'pre_usd_number':
        if (isChecked) {
          if (typeof this.eeispf.usd_pre_Number === 'object') {
            this.eeispf.usd_pre_Number = "";
          } else {
            this.eeispf.usd_pre_Number = "";
          }
        }
        break;
      case 'eduPlacementName':
        if (isChecked) {
          if (typeof this.eeispf.educationPlacementName === 'object') {
            this.eeispf.educationPlacementName = "";
          } else {
            this.eeispf.educationPlacementName = "";
          }
        }
        break;
      case 'origin_schoolName':
        if (isChecked) {
          if (typeof this.eeispf.schoolOriginName === 'object') {
            this.eeispf.schoolOriginName = "";
          } else {
            this.eeispf.schoolOriginName = "";
          }
        }
        break;

      case 'PreviosSchoolName':
        if (isChecked) {
          if (typeof this.eeispf.previousSchoolName === 'object') {
            this.eeispf.previousSchoolName = "";
          } else {
            this.eeispf.previousSchoolName = "";
          }
        }
        break;

    }
  }
  textBoxValueChange(label, event) {
    switch (label) {
      case 'Grade':
        this.gradeName = event;
        break;
      case 'PlacementName':
        this.placementNames = event;
        break;
      case 'USD':
        this.UsdName = event;
        break;
      case 'USD_number':
        this.UsdNumber = event;
        break;

      case 'school_name':
        this.schoolName = event;
        break;
      case 'USD_origin_name':
        this.orgin_usdName = event;
        break;
      case 'USD_origin_number':
        this.Usd_Orgin_Number = event;
        break;
      case 'previousPlacementName':
        this.previous_placementName = event;
        break;
      case 'preUsdName':
        this.pre_usdName = event;
        break;
      case 'pre_usd_number':
        this.usd_pre_Number = event;
        break;
      case 'eduPlacementName':
        this.pre_previous_placementName = event;
        break;
      case 'origin_schoolName':
        this.schoolOriginName = event;
        break;

      case 'PreviosSchoolName':
        this.previousSchoolName = event;
        break;


    }
  };
  selectedSentEmails = [];
  is_printPdf = false;
  isDisabled = false;
  finalEmail() {
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    this.isDisabled = true;
    setTimeout(() => {
      loader.style.display = "none";
    }, 1000);
    setTimeout(() => {
      this.finalyzEmail();
    }, 2000);

  }
  finalyzEmail() {
    this.is_printPdf = true;
    let loader = document.getElementById("loading-overlay") as HTMLElement;
    loader.style.display = "block";
    var eduCoordinatorEmail;
    var caseComTechEmail;
    var othersEmail;
    var schoolEmail;
    let schoolIDS = null;
    let eduIDS = null;
    let caseTtechIDS = null;
    let otherIDS = null;
    let group = this.selectedSentEmails.reduce((r, a) => {
      r[a.value] = [...r[a.value] || [], a];
      return r;
    }, {});
    if (typeof group.caseTcom != 'undefined') {
      var _caseTcom = [];
      group.caseTcom = group.caseTcom.map(itm => {
        _caseTcom.push(itm.email);
      });
      caseComTechEmail = _caseTcom.toString();
      caseTtechIDS = caseComTechEmail.replace(/[\[\]']+/g, '');
    }

    if (typeof group.EDUemail != 'undefined') {
      var _eduEmail = [];
      group.EDUemail = group.EDUemail.map(itm => {
        _eduEmail.push(itm.email);
      });
      eduCoordinatorEmail = _eduEmail.toString();
      eduIDS = eduCoordinatorEmail.replace(/[\[\]']+/g, '');
    }

    if (typeof group.other != 'undefined') {
      var _otherEmail = [];
      group.other = group.other.map(itm => {
        _otherEmail.push(itm.email);
      });
      othersEmail = _otherEmail.toString();
      otherIDS = othersEmail.replace(/[\[\]']+/g, '');
    }
    if (typeof group.school != 'undefined') {
      var _sclEmail = [];
      group.school = group.school.map(itm => {
        _sclEmail.push(itm.email);
      });
      schoolEmail = _sclEmail.toString();
      schoolIDS = schoolEmail.replace(/[\[\]']+/g, '');
    }
    this.emailShow = false;
    let source;
    source = this.finalyzeSource;

    console.log("<<<<<source>>>>>", JSON.stringify(source));

    if (typeof source.placementNames === 'string') {
      source.placementNames_print = source.placementNames;
    } else {
      source.placementNames_print = !isNullOrUndefined(source.placementNames) ? source.placementNames.placementName : "";
    }
    if (typeof source.usdName === 'string') {
      source.usdName_print = source.usdName;
    } else {
      source.usdName_print = !isNullOrUndefined(source.usdName) ? source.usdName.usdName : "";
    }
    if (typeof source.usdNumber === 'string') {
      source.usdNumber_print = source.usdNumber
    } else {
      source.usdNumber_print = !isNullOrUndefined(source.usdNumber) ? source.usdNumber.usd : "";
    }
    if (typeof source.schoolName === 'string') {
      source.schoolName_print = source.schoolName
    } else {
      source.schoolName_print = !isNullOrUndefined(source.schoolName) ? source.schoolName.SchoolName : "";
    }
    if (typeof source.orgin_usdName === 'string') {
      source.orgin_usdName_print = source.orgin_usdName;
    } else {
      source.orgin_usdName_print = !isNullOrUndefined(source.orgin_usdName) ? source.orgin_usdName.usdName : "";
    }
    if (typeof source.usd_orgin_Number === 'string') {
      source.usd_orgin_Number_print = source.usd_orgin_Number;
    } else {
      source.usd_orgin_Number_print = !isNullOrUndefined(source.usd_orgin_Number) ? source.usd_orgin_Number.usd : "";
    }
    if (typeof source.schoolOriginName === 'string') {
      source.schoolOriginName_print = source.schoolOriginName;
    } else {
      source.schoolOriginName_print = !isNullOrUndefined(source.schoolOriginName) ? source.schoolOriginName.SchoolName : "";
    }
    if (typeof source.placementName === 'string') {
      source.placementName_print = source.placementName;
    } else {
      source.placementName_print = !isNullOrUndefined(source.placementName) ? source.placementName.placementName : "";
    }
    if (typeof source.pre_usdName === 'string') {
      source.pre_usdName_print = source.pre_usdName;
    } else {
      source.pre_usdName_print = !isNullOrUndefined(source.pre_usdName) ? source.pre_usdName.usdName : "";
    }
    if (typeof source.usd_pre_Number === 'string') {
      source.usd_pre_Number_print = source.usd_pre_Number;
    } else {
      source.usd_pre_Number_print = !isNullOrUndefined(source.usd_pre_Number) ? source.usd_pre_Number.usd : "";
    }
    if (typeof source.previousSchoolName === 'string') {
      source.previousSchoolName_print = source.previousSchoolName;
    } else {
      source.previousSchoolName_print = !isNullOrUndefined(source.previousSchoolName) ? source.previousSchoolName.SchoolName : "";
    }
    if (typeof source.educationPlacementName === 'string') {
      source.educationPlacementName_print = source.educationPlacementName;
    } else {
      source.educationPlacementName_print = !isNullOrUndefined(source.educationPlacementName) ? source.educationPlacementName.placementName : "";
    }

    if (typeof source.eduCoordName === 'string') {
      source.eduCoordName_print = source.eduCoordName;
    } else {
      source.eduCoordName_print = !isNullOrUndefined(source.eduCoordName) ? source.eduCoordName.fullName : "";
    }
    if (typeof source.grade === 'string') {
      source.grade_print = source.grade;
    } else {
      source.grade_print = !isNullOrUndefined(source.grade) ? source.grade.grade : "";
    }




    this.isRedirect = false;
    source.schoolName = this.schoolName;
    let usdName: string, schoolName: string, schoolCity: string;
    !isNullOrUndefined(source.usdName) ? (usdName = source.usdName) : null;
    !isNullOrUndefined(source.schoolName)
      ? (schoolName = source.schoolName)
      : null;
    if (source.isIEPYES) {
      source["specialEcucation"] = true;
    } else {
      source["specialEcucation"] = false;
    }
    if (source.isIEP504YES) {
      source["generalEducation"] = true;
    } else {
      source["generalEducation"] = false;
    };
    !isNullOrUndefined(source.dateStaffed) ? source.dateStaffed = this._localValues.stringFormatDatetime(source.dateStaffed) : null;
    !isNullOrUndefined(source.dateStaffed1) ? source.dateStaffed1 = this._localValues.stringFormatDatetime(source.dateStaffed1) : null;
    !isNullOrUndefined(source.dateStaffed2) ? source.dateStaffed2 = this._localValues.stringFormatDatetime(source.dateStaffed2) : null;
    !isNullOrUndefined(source.DOPBeginDate) ? source.DOPBeginDate = this._localValues.stringFormatDatetime(Date.parse(source.DOPBeginDate)) : null;
    !isNullOrUndefined(source.DOPEndDate) ? source.DOPEndDate = this._localValues.stringFormatDatetime(Date.parse(source.DOPEndDate)) : null;
    !isNullOrUndefined(source.p_DOPEndDate) ? source.p_DOPEndDate = this._localValues.stringFormatDatetime(Date.parse(source.p_DOPEndDate)) : null;
    !isNullOrUndefined(source.p_DOPBeginDate) ? source.p_DOPBeginDate = this._localValues.stringFormatDatetime(Date.parse(source.p_DOPBeginDate)) : null;
    !isNullOrUndefined(source.schoolOriginDatesAttendedFrom) ? source.schoolOriginDatesAttendedFrom = this._localValues.stringFormatDatetime(Date.parse(source.schoolOriginDatesAttendedFrom)) : null;
    !isNullOrUndefined(source.schoolOriginDatesAttendedTo) ? source.schoolOriginDatesAttendedTo = this._localValues.stringFormatDatetime(Date.parse(source.schoolOriginDatesAttendedTo)) : null;
    !isNullOrUndefined(source.pre_schoolOriginDatesAttendedFrom) ? source.pre_schoolOriginDatesAttendedFrom = this._localValues.stringFormatDatetime(Date.parse(source.pre_schoolOriginDatesAttendedFrom)) : null;
    !isNullOrUndefined(source.pre_schoolOriginDatesAttendedTo) ? source.pre_schoolOriginDatesAttendedTo = this._localValues.stringFormatDatetime(Date.parse(source.pre_schoolOriginDatesAttendedTo)) : null;
    !isNullOrUndefined(source.dob) ? source.dob = this._localValues.stringFormatDatetime(Date.parse(source.dob)) : null;
    !isNullOrUndefined(source.date) ? source.date = this._localValues.stringFormatDatetime(Date.parse(source.date)) : null;
    !isNullOrUndefined(source.enrollmentDate) ? source.enrollmentDate = this._localValues.stringFormatDatetime(Date.parse(source.enrollmentDate)) : null;
    !isNullOrUndefined(source.datesOfPlacement) ? source.datesOfPlacement = this._localValues.stringFormatDatetime(Date.parse(source.datesOfPlacement)) : null;
    !isNullOrUndefined(source.educationPlacementDates) ? source.educationPlacementDates = this._localValues.stringFormatDatetime(Date.parse(source.educationPlacementDates)) : null;
    !isNullOrUndefined(source.suspendedDate) ? source.suspendedDate = this._localValues.stringFormatDatetime(Date.parse(source.suspendedDate)) : null;
    !isNullOrUndefined(source.studentExpelledDate) ? source.studentExpelledDate = this._localValues.stringFormatDatetime(Date.parse(source.studentExpelledDate)) : null;
    !isNullOrUndefined(source.schoolOriginDatesAttended) ? source.schoolOriginDatesAttended = this._localValues.stringFormatDatetime(Date.parse(source.schoolOriginDatesAttended)) : null;
    !isNullOrUndefined(source.previousSchoolDatesAttended) ? source.previousSchoolDatesAttended = this._localValues.stringFormatDatetime(Date.parse(source.previousSchoolDatesAttended)) : null;
    console.log("source>>>>>", JSON.stringify(source));
    let pdfDocJson = source;
    let clientName: any;
    let currentDate = moment(new Date()).format("MM/DD/YYYY");
    this.eeispf = source;
    this.jsonFormation(source);
    let referralId = this.routerReferralID;
    this.testingPur = "TESTING...";
    this.isPdf = true;
    var element = document.getElementById("pdf");
    var opt = {
      margin: 1,
      filename:
        "EEISPF_" + localStorage.getItem("clientName") + "_" + currentDate,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 1, dpi: 72, letterRendering: true },
      jsPDF: { unit: "cm", format: "a3", orientation: "portrait" },
      // orientation: 'landscape'
      pagebreak: { mode: "avoid-all", before: "#page2el" },
    };
    if (this.isFinalizeWithDownload) {
      // html2pdf().from(element).set(opt).save();
    }

    // let pdf = html2pdf().from(element).set(opt).output("blob");
    // return pdf.then((data: any) => {
    let mailFormData: FormData = new FormData();
    let req: any;
    if (this.isUpdate) {
      req = {
        pdfdocID: this.redirectPdfDocID,
        jsonData: JSON.stringify(source),
        referralID: referralId,
        "mailConfig": {
          "CaseTeam_ComplianceTech_Email": caseTtechIDS,
          "schoolIDS": schoolIDS,
          "EducationCoordinatorID": eduIDS,
          "othersID": otherIDS
        },

        clientID: this.routerClientID,
        usdName: usdName,
        schoolName: schoolName,
        schoolCity: schoolCity,
        userID: this.currentUserId || 4620
      };
      if (this.eeispf.isIEPYES) {
        req["specialEducation"] = true;
        req["staffID"] = this.currentUserId || 4620;
      }

      if (this.eeispf.isIEP504YES) {
        req["generalEducation"] = true;
        req["staffID"] = this.currentUserId || 4620;
      }
    } else {
      req = {
        jsonData: JSON.stringify(source),
        referralID: referralId,
        mailConfig: {
          "CaseTeam_ComplianceTech_Email": caseTtechIDS,
          "schoolIDS": schoolIDS,
          "EducationCoordinatorID": eduIDS,
          "othersID": otherIDS
        },

        clientID: this.routerClientID,
        usdName: usdName,
        schoolName: this.eeispf.schoolName,
        schoolCity: schoolCity,
        userID: this.currentUserId || 4620
      };
      if (this.eeispf.isIEPYES) {
        req["specialEducation"] = true;
        req["staffID"] = this.currentUserId || 4620;
      }

      if (this.eeispf.isIEP504YES) {
        req["generalEducation"] = true;
        req["staffID"] = this.currentUserId || 4620;
      }
    }
    mailFormData.append("pdfDocJson", JSON.stringify(pdfDocJson));
    mailFormData.append("eduJson", JSON.stringify(req));

    this._educationEnroll.saveFinalize(mailFormData).then((res) => {
      console.log(res)
      var response = JSON.parse(res['_body']);
      loader.style.display = "none";
      if (response.url) {
        window.location.href = response.url;
      };
      if (response.responseStatus) {

        Swal.fire("Verified!", "The form finalized", "success");
        swal("Finalize", response.responseMessage, "success");
        // this.emailNotifiersAlert();
        return this._router.navigate([
          "/reintegration/referral/opencard/school/eeispf/view",
        ], {
            queryParamsHandling: "preserve",
          });
      }
    }).catch((error) => {
      // this.isPdf = false;
      // this.isRedirect = true;
      // console.log(">>>>>>error>>>>>", error);
      // loader.style.display = "none";




      let updateReq = {
        pdfdocID: this.redirectPdfDocID,
        jsonData: JSON.stringify(source),
        referralID: referralId
      }
      if (this.eeispf.isIEPYES) {
        updateReq['specialEducation'] = true;
        updateReq['staffID'] = this.currentUserId || 4620;
      }

      if (this.eeispf.isIEP504YES) {
        updateReq['generalEducation'] = true;
        updateReq['staffID'] = this.currentUserId || 4620;
      }

      this._educationEnroll.updateDraft(updateReq).then((data) => {
        loader.style.display = 'none';
        return this._router.navigate([
          "/reintegration/referral/opencard/school/eeispf/view",
        ], {
            queryParamsHandling: "preserve",
          });
      }).catch((error) => {

      })






    });
    // });
    //   } else {
    //     this.isPdf = false;
    //   }
    // });





  };
  sendEmail: any;
  Add_finalyzEmail() {
    var emailData = {
      email: this.sendEmail,
      value: 'other'
    }
    this.allSendEmails.push(emailData);
    this.sendEmail = "";
  }
  cancelWindow() {
    this.emailShow = false;
    this.isPdf = false;
  }
  DraftFinalyze() {

  }
}
