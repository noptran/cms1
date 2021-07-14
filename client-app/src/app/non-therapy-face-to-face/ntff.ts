export class Ntff {
  nonTherapyFaceToFaceID: any;
  beginDate: any;
  endDate: any;
  location: string;
  staffID: any;
  clientsPresent: string;
  interactions: string;
  relatedTask: string;
  review: string;
  homeSafetyConcerns_YesNoPendingID: any;
  homeIsClean_YesNoPendingID: any;
  childIsClean_YesNoPendingID: any;
  childAppearsHealthy_YesNoPendingID: any;
  heightWeight_YesNoPendingID: any;
  unusualMarks_YesNoPendingID: any;
  additionalComments: string;
  nextAppointmentDate: any;
  planTillNextAppointment: string;
  statusTypeID: any;
  serviceSupport: string;
  riskComments: string;
  problemsConcerns: string;
  followUp: string;
  weaponsObserv_YesNoPendingID: any;
  suicidalThoughts_YesNoPendingID: any;
  violentThoughts_YesNoPendingID: any;
  caregiver_YesNoPendingID: any;
  developedOrReviewed_YesNoPendingID: any;
  safetyConcerns_YesNo: any;
  riskHouse_YesNo: any;
  riskCaregiver_YesNo: any;
  riskphysical_YesNo: any;
  riskChildSpace_YesNo: any;
  riskChildSelfHarming_YesNo: any;
  riskChildAggressive_YesNo: any;
  riskIntenseplan_YesNo: any;
  reviewCasePlan_YesNoPendingID: any;
  nonIntense_YesNoPendingID: any;
  caseActivityID: any;
  referralID: any;
  clientID: any;
  isVerified = false;
  planactivityDuringTheSession: string;
  familySafetyPlan: string;
  safetyNeeds: string;
  safetyComments: string;
  childHygieneAndDress_YesNoPendingID: any;
  reviewProgressPlanActivities: string;
  additionalRiskConcernVisited_YesNoPendingID: any;
  familyStrengthsAndResources: string;
  heightWeightAppears_YesNoPendingID: any;
  reviewOfCasePlanProgress: string;

}

export class NtffAttachment {
  caseName: any;
  caseNumber: any;
  date: any;
  dateOfReferral: any;
  startTime: any
  endTime: any;
  duration: any;
  procode: any;
  aloneTimeData: any;
  isProcodeCaseSupervision = false;
  isProcodeFamilySupportService = false;
  isUnusualMarksYes = false;
  isUnusualMarksNo = false;
  isUnusualMarksNA = false;
  isHeighWeightNormalYes = false;
  isHeighWeightNormalNo = false;
  isHeighWeightNormalNA = false;
  isChildAppearHealthyYes = false;
  isChildAppearHealthyNo = false;
  isChildAppearHealthyNA = false;
  isHomeCleanYes = false;
  isHomeCleanNo = false;
  isHomeCleanNA = false;
  isHomeSafetyConcernsYes = false;
  isHomeSafetyConcernsNo = false;
  isHomeSafetyConcernsNA = false;
  isVerified = false;
  staffName: any;

  isWeaponsObservedYes = false;
  isWeaponsObservedNo = false;
  isWeaponsObservedNA = false;

  isSuicidalThoughtsYes = false;
  isSuicidalThoughtsNo = false;
  isSuicidalThoughtsNA = false;

  isViolentThoughtsYes = false;
  isViolentThoughtsNo = false;
  isViolentThoughtsNA = false;

  isCaregiverYes = false;
  isCaregiverNo = false;
  isCaregiverNA = false;

  isSafetyConcernsYes = false;
  isSafetyConcernsNo = false;
  isSafetyConcernsNA = false;

  isRiskHouseYes = false;
  isRiskHouseNo = false;
  isRiskHouseNA = false;

  isRiskCaregiverYes = false;
  isRiskCaregiverNo = false;
  isRiskCaregiverNA = false;

  isRiskPhysicalYes = false;
  isRiskPhysicalNo = false;
  isRiskPhysicalNA = false;

  isRiskChildSpaceYes = false;
  isRiskChildSpaceNo = false;
  isRiskChildSpaceNA = false;

  isRiskChildSelfHarmYes = false;
  isRiskChildSelfHarmNo = false;
  isRiskChildSelfHarmNA = false;

  isRiskChildAggressiveYes = false;
  isRiskChildAggressiveNo = false;
  isRiskChildAggressiveNA = false;

  isHeightWeightYes = false;
  isHeightWeightNo = false;
  isHeightWeightNA = false;

  isRiskIntensePlanYes = false;
  isRiskIntensePlanNo = false;
  isRiskIntensePlanNA = false;

  isReviewCasePlanYes = false;
  isReviewCasePlanNo = false;
  isReviewCasePlanNA = false;

  isNonIntenseYes = false;
  isNonIntenseNo = false;
  isNonIntenseNA = false;

  followUp: any;
  riskComments: any;
  safetyNeeds: any;

  isDevelopedReviewedYes = false;
  isDevelopedReviewedNo = false;
  isDevelopedReviewedNA = false;

  isChildHygieneYes = false;
  isChildHygieneNo = false;
  isChildHygieneNA = false;

  isAdditionalRiskConcernYes = false;
  isAdditionalRiskConcernNo = false;
  isAdditionalRiskConcernNA = false;

  planactivityDuringTheSession: any;
  familySafetyPlan: any;
  safetyComments: any;
  familyStrengthsAndResources: any;
  reviewProgressPlanActivities: any;

  isCaregiverShowingYes = false;
  isCaregiverShowingNo = false;
  isCaregiverShowingNA = false;
}
