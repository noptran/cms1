export class Autofecth {
  clientName: string;
  kaecses: string;
  facts: any;
  sSN: string;
  gender: string;
  genderID: number;
  dOB: string;
  race: string;
  raceID: number;
  caseManager: string;
  caseManager_StaffID: number;
  SFAOffice: any;
  SFAOfficeID: any;
  Address: any;
  City: any;
  State: any;
  Zipcode: any;
  workPhone: string;
  reasonForCustody: string;
  ClientAllergies: string;
  clientAllergiesID: number;
  sEDwithCBS: boolean;
  diagnosedMRDD: boolean;
  mRDDWaiver: boolean;
  // tierLevelID: any;
  currentSchool: string;
  current_SchoolID: number;
  newPlacementShouldHave: string;
  newPlacementShouldNotHave: string;
  childWantsNewPlacementToHave: string;
  strengths: string;
  hobbiesInterests: string;
  interventions: string;
  strengthsBasedDescriptionOfChild: string;
  medicalDiagnosis: string;
  mentalDiagnosis: string;
  isInitial: any;
  isDraft?: any;
  statusTypeID = null;
  homeCounty: any;
  isPrivate: any;
  isAllowPrivate: string;
  cm_EnteredBy: any;
  cm_EnteredDate: any;
  cm_EnteredBy_StaffName: any;
  cm_EnteredBy_StaffID: any;
  cc_ChangedBy?: any;
  cc_EnteredBy?: any;
  cc_EnteredBy_StaffID?: any;
  cc_EnteredBy_StaffName?: any;
  cc_EnteredDate?: any
}

export interface PlacementReferralClientStrength {
  clientStrengthID: number;
}

export interface PlacementReferralVisitation {
  familyMemberReferralID: number;
}

export interface PlacementReferralSibling {
  clientSiblingID: number;
}

export interface PlacementReferralClientProfile {
  clientProfileID: number;
}

export interface PlacementReferralPreventativeMeasure {
  clientPreventativeMeasureID: number;
}

export interface PlacementReferralAssessment {
  assessmentID: number;
}

export interface PlacementReferralMedication {
  clientMedicationID: number;
}

export interface PlacementReferralAppointment {
  appointmentID: number;
}

export interface PlacementReferralPlacement {
  placementID: number;
}

export class PlacementReferral {
  placementReferralID: any;
  placementReferralClientStrength = [];
  placementReferralVisitation = [];
  placementReferralSibling = [];
  placementReferralClientProfile = [];
  placementReferralPreventativeMeasure = [];
  placementReferralAssessment = [];
  placementReferralMedication = [];
  placementReferralAppointment = [];
  placementReferralPlacement = []
  anyPendingCharges: any;
  appointments: any;
  careLevelID: any;
  careLevelOther: any;
  caseManager_StaffID: any;
  casePlanGoalID: any;
  cc_EnteredDate: any;
  childWantsNewPlacementToHave: any;
  clientID: any;
  clientName: any;
  communityServiceHours: any;
  courtOrdersSpecificToPlacement: any;
  current_SchoolID: any;
  currentDentist: any;
  currentDoctor: any;
  currentEyeDoctor: any;
  currentPsychiatrist: any;
  dateOfLastIEP: any;
  dentist_CityID: any;
  doctor_CityID: any;
  eyeDoctor_CityID: any;
  psychiatrist_CityID: any;
  dentist_StateID: any;
  doctor_StateID: any;
  eyeDoctor_StateID: any;
  psychiatrist_StateID: any;
  diagnosedMRDD: any;
  sEDwithCBS: any;
  director_AuthorizationLengthID: any;
  director_DateAuthorized: any;
  director_LevelOfCareAuthorizedID: any;
  director_StaffID: any;
  dob: any;
  enteredDate: any;
  enteredBy: any;
  facts: any;
  genderID: any;
  geographicalPreference: any;
  gradeID: any;
  hasSafetyPlan: any;
  height: any;
  hobbiesInterests: any;
  interventions: any;
  isInitial: any;
  isDraft: any;
  isPrivate: any;
  kaecses: any;
  kinship: any;
  lengthOfStay: any;
  medicalDiagnosis: any;
  mentalDiagnosis: string;
  needsCommunityService: any;
  needsGED: any;
  needsSafetyPlan: any;
  newPlacementShouldHave: any;
  newPlacementShouldNotHave: any;
  no_Run_Order: any;
  pendingCharges: any;
  placementNeeded: any;
  providerPreference: any;
  qualifyMRDD: any;
  raceID: any;
  reasonForCustody: any;
  reasonForMove: any;
  receiveSSFunding: any;
  referralID: any;
  reviewedForAccuracy: any;
  schoolBehaviorProblems: any;
  SEDWithCBS: any;
  SFAOfficeID: any;
  specialEducationTypeID: any;
  ssn: any;
  statusTypeID: any;
  strengths: any;
  strengthsBasedDescriptionOfChild: any;
  therapist: any;
  therapistAgency: any;
  therapistAppointmentTimes: any;
  tierLevelID: any;
  weight: any;
  mrddwaiver: any;
  MRDDWaiver = false;
}

export class PlacementReferralAutoFecth {
  clientName: string;
  kaecses: string;
  facts?: any;
  ssn: string;
  gender: string;
  genderID: number;
  dOB: string;
  race: string;
  raceID: number;
  caseManager: string;
  caseManager_StaffID: number;
  sFAOffice?: any;
  sFAOfficeID?: any;
  address?: any;
  city?: any;
  state?: any;
  zipcode?: any;
  workPhone: string;
  reasonForCustody: string;
  clientAllergies: any;
  clientAllergiesID: number;
  diagnosedMRDD: boolean;
  sEDwithCBS: boolean;
  mRDDWaiver: boolean;
  tierLevelID: any;;
  currentSchool: string;
  current_SchoolID: number;
  newPlacementShouldHave: string;
  newPlacementShouldNotHave: string;
  childWantsNewPlacementToHave: string;
  strengths: string;
  hobbiesInterests: string;
  interventions: string;
  strengthsBasedDescriptionOfChild: string;
  medicalDiagnosis: string;
  mentalDiagnosis: string;
  isInitial?: any;
  isDraft?: any;
  statusTypeID: number;
  homeCounty?: any;
  isPrivate?: any;
  isAllowPrivate: string;
  cm_EnteredBy?: any;
  cm_EnteredDate?: any;
  cm_EnteredBy_StaffName?: any;
  cm_EnteredBy_StaffID?: any;
  cc_ChangedBy?: any;
  cc_EnteredBy?: any;
  cc_EnteredBy_StaffID?: any;
  cc_EnteredBy_StaffName?: any;
  cc_EnteredDate?: any
}
