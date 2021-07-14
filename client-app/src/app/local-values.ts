import { Injectable } from "@angular/core";
import { isNullOrUndefined } from "util";
import * as moment from "moment";

/** Record id and common methods and values used in the application */
@Injectable()
export class LocalValues {
  caseAcitivityID = null;
  public date = new Date();
  beginDateOfCurrentMonth = new Date(
    this.date.getFullYear(),
    this.date.getMonth(),
    1
  );
  endDateOfCurrentMonth = new Date(
    this.date.getFullYear(),
    this.date.getMonth() + 1,
    0
  );
  clientChanges = false;
  clientData: any;
  caseID: any;
  isNavigateToCAL = false; // Return to case activity log
  currentProviderID: any;
  beginDateOfPreviousMonth = new Date(
    this.date.getFullYear(),
    this.date.getMonth() - 1,
    1
  );
  endDateOfPreviousMonth = new Date(
    this.date.getFullYear(),
    this.date.getMonth(),
    0
  );
  beginTime: any;
  endTime: any;
  duration: any;
  isSecondsNeedInDuration = false;
  timeDifferenceFormat: string;
  timeStampValueForDay = 86400000; // 60*60*24*1000;
  isLivingArrangment = false; // Checking for printing forms order in placement footer component
  livingArrangmentSchoolReason: any;
  currentPlacementDetailID: any;
  livingArrangementProviderId = null;
  livingArrangementProviderName = null;
  ackOptionsJudgeInfo = null;
  ackOptionsCaseManagerInfo = null;
  currentAuthorizationId = null;
  currentPlacementDisruptionID = null;
  currentPlacementProviderID = null;
  currentReferralID = null;
  selectedProviderProfileInfo: any;
  selectedDCFID: Number;
  personInitialDetailsFromPersonMasterCreation: any;
  providerContractStateId = null;
  previousurl: string;
  continuumofCareFlowChartDocID = null;
  placementAgreementKinshipDocID = null;
  placementAgreementKinshipAndAgencyApprovedDocID = null;
  placementEventStatusDocID = null;
  providerServiceAgreementDocID = null;
  referralNotificationOfMovePlacementChangeDocID = null;
  referralNotificationOfMovePlacementChangeVoidDocID = null;
  loadProviderEnvelopeDocID = null;
  staffId = null;
  deleteRequestKey = null;
  deleteRequestNode = null;
  isPlacementNewValidationSet = false;
  ClientNameLastFirst = null;
  isAllergiesPromptTrue = false;
  contractStateId = null;
  currentPlacementProviderInfo = null;
  placementEventInfo = null;
  referralNotificationOfMovePlacementChangeDocIDReturn = null;
  PlacementAgreementID = null;

  closureDate: any;
  printurl: any;
  multyClientIDS: any;
  previousClientId: any;
  placementHistoryListSelectData = null;
  currentClientID = null;
  placementLivingArragmentFlowFlag: string = undefined;
  placementProviderMode = "providers";
  sfmOfficeID = null;
  staffCount = 0;
  placementAckSchoolLateReason: any;
  placementEventStatusValue: any;
  medicationAllergiesDelelePRTF = null;
  placementAgreementValue: any;
  placementEventStatusVoid: any;
  referralValidationCheckValues: any;
  providerServiceAgreementDocIDVoid: any;
  caseTeamPersonJumptoTree = false;
  caseTeamClientId = null;
  caseTeamDelete = false;
  familyMemberID = null;
  caseTeamIDJumpTree = null;
  placementAttendingSchoolLogic = { show: "", hide: "" };
  placementAgrementVoid = null;
  faxListDOCID = null;
  currentPlacementProviderLocation = null;
  staffProfileData: any;
  clientProfileData: any;

  report_begin_dateAndTime(timeStamp: any) {
    return `${new Date(timeStamp).getFullYear()}-${String(
      new Date(timeStamp).getMonth() + 1
    ).padStart(2, "0")}-${String(new Date(timeStamp).getDate()).padStart(
      2,
      "0"
    )} 00:00:00`;
  }
  report_end_dateAndTime(timeStamp: any) {
    return !isNullOrUndefined(timeStamp)
      ? `${new Date(timeStamp).getFullYear()}-${String(
          new Date(timeStamp).getMonth() + 1
        ).padStart(2, "0")}-${String(new Date(timeStamp).getDate()).padStart(
          2,
          "0"
        )} 23:59:59`
      : null;
  }
  stringFormatDate(timeStamp: any) {
    return !isNullOrUndefined(timeStamp)
      ? `${new Date(timeStamp).getFullYear()}-${String(
          new Date(timeStamp).getMonth() + 1
        ).padStart(2, "0")}-${String(new Date(timeStamp).getDate()).padStart(
          2,
          "0"
        )}`
      : null;
  }

  stringFormatDatetime(timeStamp: any) {
    return !isNaN(timeStamp)
      ? `${new Date(timeStamp).getFullYear()}-${String(
          new Date(timeStamp).getMonth() + 1
        ).padStart(2, "0")}-${String(new Date(timeStamp).getDate()).padStart(
          2,
          "0"
        )} ${String(new Date(timeStamp).getHours()).padStart(2, "0")}:${String(
          new Date(timeStamp).getMinutes()
        ).padStart(2, "0")}:${String(new Date(timeStamp).getSeconds()).padStart(
          2,
          "0"
        )}.000`
      : null;
  }
  localStringFormatSlashFormat(timeStamp: any) {
    return timeStamp ? moment(timeStamp).format("MM/DD/YYYY hh:mm A") : null;
  }
  camelize(str: any) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word: any, index: any) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  }

  spaceSperator(str: any) {
    return (
      str
        // insert a space before all caps
        .replace(/([A-Z])/g, " $1")
        // uppercase the first character
        .replace(/^./, function (str) {
          return str.toUpperCase();
        })
    );
  }

  getUTCDateStringFormate(timeStamp: any) {
    return moment.utc(timeStamp).format("MM/DD/YYYY HH:mm");
  }

  getTimeAlongWithFormat(timeStamp: any) {
    return moment(timeStamp).format("hh:mm A");
  }

  getDateandTimeWithExt(timeStamp: any) {
    return timeStamp ? moment(timeStamp).format("MM/DD/YYYY hh:mm A") : "";
  }
  getDateWithExt(timeStamp: any) {
    return timeStamp ? moment(timeStamp).format("MM/DD/YYYY") : "";
  }
  /**
   *
   * @param node                - Name of the node
   * @param existingBredcurmbs  - Existing breadcurmbs of the component
   *
   *Avaliable referral types
    1 FC Reintegration Foster Care
    2 FI Family Pres (In-Home)
    3 AD Adoption
    4 NC-FCH NC Foster Care Homes
    5 NC-FI NC Family Pres (In-Home)
    6 FO Family Pres (Out-of-Home)
    7 NC-RFC Non-Contract Reintegration Foster Care
    8 NC-HS Non-Contract Home Study/FCH Services
    9 NC-OPS Non-Contract Out-Patient Services
    10 NC-FCH OK NC Foster Care Homes Oklahoma
    11 NC-MHR Non-Contract Mental Health Respites
    12 NC-FCH NE NC Foster Care Homes Nebraska
    13 NC-KIPP NC Kansas Intensive Permanency Project
    14 PRTF Psychiatric Residential Treatment Facility
    15 BH OK Bridge Home Oklahoma
    16 NC-BH OK NC-BH Bridge Home Oklahoma
    17 JJFC Juvenile Justice Foster Care
    18 HOME TIES Home Ties Youth Residential Center
    19 YRCII Youth Residential Center II
    20 SUB-RFC Sub-Contract Reintegration Foster Care
    22 CLOVER HOUSE Clover House
    23 NC-FP NE Non-Contract Family Pres (In Home) Nebraska
    24 FI NE Family Pres (In Home) Nebraska
   */
  breadcrumbsChanges(node: string, existingBredcurmbs: any) {
    switch (node) {
      /** Referral Type ID = 9, Case Form - /reports/referral/nc-ops/detail */
      case "Caseactivity-NCOPS":
      case "progresssNoteDiagnosis-NCOPS":
      case "progressNote-NCOPS":
      case "caseFileActivity-NCOPS":
      case "caseTeam-NCOPS":
      case "caseActivityAttachment-NCOPS":
      case "caseFileActivityAttachment-NCOPS":
      case "caseTeamAttachment-NCOPS":
      case "participantInTherophy-NCOPS":
      case "serviceAgreeement-NCOPS":
        existingBredcurmbs[2].href = "/reports/referral/nc-ops/detail";
        break;
      /** Referral Type ID = 5, Case Form - ,  */
      case "appointments-NCFI":
      case "caseFileActivity-NCFI":
      case "serviceAgreement-NCFI":
        existingBredcurmbs[2].href =
          "/reports/referral/family-preservation/detail";
        break;

      /** Referral Type ID = 4 , Case Form - /reports/nc-fch/detail */
      case "adoption-NCFCH":
      case "appointments-NCFCH":
      case "assessment-NCFCH":
      case "caseFileActivity - NCFCH":
      case "monthlyRepots-NCFCH":
      case "placements-NCFCH":
      case "sfcsOffice-NCFCH":
      case "authorization-summary":
      case "caseTeam-NCFCH":
      case "homecounty-NCFCH":
      case "extendedFamily-NCFCH":
      case "siblingsInOutHome_NCFCH":
      case "schoolDashboard-NCFCH":
      case "medicalDashboard-NCFCH":
      case "serviceClaims-NCFCH":
      case "caseActivity-NCFCH":
      case "waiver-NCFCH":
      case "healthRecord-NCFCH":
      case "attendingSchool-NCFCH":
      case "homeSchool-NCFCH":
      case "bhDetermination-NCFCH":
      case "kanBeHealthy-NCFCH":
      case "gradeLevel-NCFCH":
        existingBredcurmbs[2].href = "/reports/nc-fch/detail";
        break;
      /** Referral Type ID = 7, Case Form -  */
      case "appointments-NCRFC":
      case "billable-case-activity-NCRFC":
      case "caseActivity-NCRFC":
      case "caseFileActivity-NCRFC":
      case "caseTeam-NCRFC":
      case "courtOrder-NCRFC":
      case "homecounty-NCRFC":
      case "serviceAgreement-NCRFC":
      case "serviceClaims-NCRFC":
      case "sfcsOffice-NCRFC":
        existingBredcurmbs[2].href = "/reports/nc-rfc/detail";
        break;
      case "siblingsInOutHome-NCRFC":
        existingBredcurmbs[5].href = "/reports/nc-rfc/detail";
        break;
      case "caseForm-BHOK":
        existingBredcurmbs[2].href = "/bh-ok/detail";
        break;

      /** Referral Type ID = 8, Case Form NC-HS */
      case "billable-case-activity-NCHS":
      case "caseActivityAttachment-NCHS":
      case "caseActivity-NCHS":
      case "caseTeam-NCHS":
      case "sfcsOffice-NCHS":
      case "caseFileActivity-NCHS":
      case "monthlyRepots-NCHS":
      case "serviceAgreement-NCHS":
        existingBredcurmbs[2].href = "/nc-hs/detail";
        break;

      case "authorization-summary-viewonly":
      case "caseFileActivity-JJFC":
      case "caseTeam-JJFC":
      case "placements-JJFC":
      case "progressNote-JJFC":
      case "sfcsOffice-JJFC":
      case "homecounty-JJFC":
      case "medicalDashboard-JJFC":
      case "schoolDashboard-JJFC":
      case "immunization-JJFC":
      case "extendedFamily-JJFC":
      case "healthRecord-JJFC":
      case "gradeLevel-JJFC":
      case "sfaOffice-JJFC":
      case "schoolRelease-JJFC":
      case "eeispf-JJFC":
      case "generalEducation-JJFC":
      case "specialEducation-JJFC":
      case "attendingSchool-JJFC":
      case "homeSchool-JJFC":
      case "kanBeHealthy-JJFC":
        existingBredcurmbs[2].href = "/jjfc/detail";
        break;
      case "authorization-summary-viewonly-NCMHR":
      case "caseFileActivity-NCMHR":
      case "caseTeam-NCMHR":
      case "homecounty-NCMHR":
      case "placements-NCMHR":
      case "sfcsOffice-NCMHR":
      case "attendingSchool-NCMHR":
      case "homeSchool-NCMHR":
      case "schoolDashboard-NCMHR":
      case "extendedFamily-NCMHR":
      case "siblingsInOutHome-NCMHR":
        existingBredcurmbs[2].href = "/nc-mhr/detail";
        break;
      case "sfcsOffice-RFC":
        existingBredcurmbs[2].href = "/reintegration/referral/detail";
        break;
      case "appointments-PRTF":
      case "assessments-PRTF":
      case "caseEvaluation-PRTF":
      case "caseFileActivity-PRTF":
      case "caseTeam-PRTF":
      case "courtOrders-PRTF":
      case "schoolDashboard-PRTF":
      case "extendedFamily-PRTF":
      case "homeSchool-PRTF":
      case "attendingSchool-PRTF":
        existingBredcurmbs[2].href =
          "/reports/referral/family-preservation/detail";
        break;
    }
    return existingBredcurmbs;
  }

  /**
   * @author santhosh
   * @summary pass value for 'beginTime' and endDate 'endTime' in this properties,
   * For seconds pass the value for 'timeDifferenceFormat' property
   * Avaliable formats are
   * H-M-S      - Hours-Minutes-Second
   * D-H-M-S    - Days-Hours-Minutes-Second
   * Y-MH-D-H-S - Year-Month-Days-Hours-Minutes-Second
   * M-S        - Minutes-Second
   * H-M        - Hours-Minutes
   * FMDH-M     - (Month+Days+Hours)Hours-Miuntes
   * @returns time difference format in string format
   */
  durationCalculation() {
    let convertedBeginTime: any,
      convertedEndTime: any,
      timeDifference: any,
      diffYears: any,
      diffDates: any,
      diffMonths: any,
      diffHours: any,
      diffMinutes: any,
      diffSeconds: any,
      requestedFormat: any,
      diffFullMonthHours: any;

    convertedBeginTime = new Date(this.beginTime).getTime();
    convertedEndTime = new Date(this.endTime).getTime();
    timeDifference = convertedEndTime - convertedBeginTime;

    diffYears = new Date(timeDifference).getFullYear();
    diffDates = new Date(timeDifference).getDate() - 1;
    diffMonths = new Date(timeDifference).getMonth();
    diffHours = new Date(timeDifference).getHours() - 5;
    diffMinutes = new Date(timeDifference).getMinutes() - 30;
    diffSeconds = new Date(timeDifference).getSeconds();
    diffFullMonthHours = diffMonths * 730.001 + diffDates * 24 + diffHours;

    switch (this.timeDifferenceFormat) {
      case "H-M-S":
        requestedFormat = `${diffHours} Hours, ${diffMinutes} Minutes : ${diffSeconds} Seconds`;
        break;
      case "D-H-M-S":
        requestedFormat = `${diffDates} Days, ${diffHours} Hours, ${diffMinutes} Minutes : ${diffSeconds} Seconds`;
        break;
      case "Y-MH-D-H-S":
        requestedFormat = `${diffYears} Years, ${diffMonths} Months, ${diffDates} Days, ${diffHours} Hours,
                  ${diffMinutes} Minutes, ${diffSeconds} Seconds`;
        break;
      case "M-S":
        requestedFormat = `${diffMinutes} Minutes,  ${diffSeconds} Seconds`;
        break;
      case "FMDH-M":
        requestedFormat = `${diffFullMonthHours} Hours,  ${diffMinutes} Minutes`;
        break;
      default:
        requestedFormat = "Requested format does not exist!";
    }
    return requestedFormat;
  }

  /**
   * @author santhosh
   * @param timeStampInput Timestamp
   * @returns UTC time format as string
   */
  getUTCFormDate(timeStampInput: number) {
    let utcOut = new Date(timeStampInput).toUTCString(),
      utcDate = new Date(timeStampInput)
        .getUTCDate()
        .toString()
        .padStart(2, "0"),
      utcMonth = (new Date(timeStampInput).getUTCMonth() + 1)
        .toString()
        .padStart(2, "0"),
      utcYear = new Date(timeStampInput).getUTCFullYear(),
      utcHour = "",
      utcMinute = new Date(timeStampInput)
        .getUTCMinutes()
        .toString()
        .padStart(2, "0"),
      utcSecond = new Date(timeStampInput)
        .getUTCSeconds()
        .toString()
        .padStart(2, "0"),
      timeFormat = "";
    if (new Date(timeStampInput).getUTCHours() === 0) {
      timeFormat = "";
    } else if (new Date(timeStampInput).getUTCHours() < 12) {
      timeFormat = "AM";
    } else {
      timeFormat = "PM";
    }
    if (new Date(timeStampInput).getUTCHours() === 0) {
      utcHour = "00";
    } else if (new Date(timeStampInput).getUTCHours() <= 12) {
      utcHour = new Date(timeStampInput)
        .getUTCHours()
        .toString()
        .padStart(2, "0");
    } else {
      utcHour = (new Date(timeStampInput).getUTCHours() - 12)
        .toString()
        .padStart(2, "0");
    }

    new Date(timeStampInput).getUTCHours() >= 12 ? "PM" : "AM";

    // utcTimeFormat
    return timeStampInput !== null
      ? `${utcMonth}/${utcDate}/${utcYear} ${utcHour}:${utcMinute}:${utcSecond} ${timeFormat}`
      : "";
  }

  previous13month(endDate) {
    return new Date(endDate.getFullYear(), endDate.getMonth() - 12, 1);
  }
  singlemonth(endDate) {
    return new Date(endDate.getFullYear(), endDate.getMonth() - 0, 1);
  }

  stringFormatDatetimeWithoutSeconds(timeStamp: any) {
    return !isNaN(timeStamp)
      ? `${new Date(timeStamp).getFullYear()}-${String(
          new Date(timeStamp).getMonth() + 1
        ).padStart(2, "0")}-${String(new Date(timeStamp).getDate()).padStart(
          2,
          "0"
        )} ${String(new Date(timeStamp).getHours()).padStart(2, "0")}:${String(
          new Date(timeStamp).getMinutes()
        ).padStart(2, "0")}:00.000`
      : null;
  }
}
