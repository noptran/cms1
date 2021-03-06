export class Referral {
  referralTypeID: number;
  beginDate: number;
  contract_StateID: number;
  description: string;
  endDate?: any;
  isContract = 0;
  isHasPlacements = 0;
  referralType: string;
  createdDate?: any;
  updatedDate?: any;
  lastModifiedDate?: any;
  isActive?: any;
  isDeleted?: any;
}

export class RfcReferral {
  referralID: any;
  clientID: any;
  abandonment = 0;
  abuse = 0;
  additionalInfo?: any;
  additionalInformationRemoval?: any;
  allergies: any;
  annualHouseholdIncome?: any;
  attendTeamMeetingOk = 0;
  attendTeamMeetingReason?: any;
  attendTeamMeetingOk_YesNoPendingID: any;
  birthCert = 0;
  birthRecords = 0;
  caseID: number;
  cfs1000 = 0;
  cfs4003 = 0;
  changedBy?: any;
  changedDate?: any;
  childAlcoholAbuse = 0;
  childBehaviorProblem = 0;
  childCasePlan = 0;
  childDisability = 0;
  childDrugAbuse = 0;
  cincnan = 0;
  citizenship?: any;
  closureDate: number;
  closureReasonID?: any;
  closureReasonNote: string;
  courtDocs = 0;
  currentGrade: string;
  dateTimeRetrieved: any;
  deathParent = 0;
  deathParentRelinquishment = 0;
  disability: any;
  dischargeDate?: any;
  dischargeTo?: any;
  drugsAlcohol: any;
  dualAdj_BeginDate?: any;
  dualAdj_EndDate?: any;
  emotionalAbuse = 0;
  enteredBy: string;
  enteredDate: number;
  explanation: string;
  failureToThrive = 0;
  familyCasePlan = 0;
  familyRefused = 0;
  fba = 0;
  file_StaffID?: any;
  fileIssueDate?: any;
  fireStarter: any;
  handiCap: any;
  immunizationRecs = 0;
  inadequateHousing = 0;
  initialReferralDate?: any;
  isAdoptionReferral = 0;
  isChangeOfVenue = 0;
  isFatherIncarcerated = 0;
  isFormerFamilyPresCase = 0;
  isJJAReferral = 0;
  isMotherIncarcerated = 0;
  isOnRadar = 0;
  isSingleParentHousehold = 0;
  isTitleIVEEligible = 0;
  isUSCitizen?: any;
  judicialDistrictID?: any;
  ksde = 0;
  lackSupervision = 0;
  legacy_CaseID: string;
  legacy_File_StaffID?: any;
  legacy_FP24HR_StaffID?: any;
  legacy_FP48Hr_StaffID?: any;
  legacy_IsKVCTransfer = 0;
  legacy_ReferralID: string;
  legacy_TFI_CaseID?: any;
  legacy_TFI_ReferralID?: any;
  legacy_UMY_CaseID?: any;
  legacy_UMY_ReferralID?: any;
  medicalCard = 0;
  medicalConsent = 0;
  medicalNeglect = 0;
  medication: any;
  medRecords = 0;
  minutesSpent: number;
  mma?: any;
  motherMarried_YesNoPending?: any;
  motherMarriedNotes?: any;
  iCWAApply_YesNoPendingID: any;
  tribeNotified_YesNoPendingID: any;
  isMotherIncarcerated_YesNoPendingID: any;
  isFatherIncarcerated_YesNoPendingID: any;
  neglect = 0;
  notes?: any;
  numberLivingInHousehold?: any;
  officeFile?: any;
  other = 0;
  other1: number;
  other1Desc?: any;
  other2: number;
  other2Desc?: any;
  otherAttachDescription?: any;
  otherAttachments = 0;
  otherContactFName?: any;
  otherContactLName?: any;
  otherContactMI?: any;
  otherContactPhone?: any;
  otherContactRelationship?: any;
  otherReasonForPlacement?: any;
  outcomes_Adopt_ReleaseDate: number;
  outcomes_Other_ReleaseDate?: any;
  outcomes_ReleaseDate: number;
  outcomes_Reuni_ReleaseDate?: any;
  parentAlcoholAbuse = 0;
  parentDrugAbuse = 0;
  parentIllnessDisabilityInability = 0;
  parentIncarceration = 0;
  parentMethUse = 0;
  parentRelinquishment = 0;
  paymentBeginDate: number;
  paymentEndDate: number;
  permanencyGoalID?: any;
  physicalAbuse = 0;
  physicalAggression: any;
  physicalNeglect = 0;
  pickupLocation: string;
  pickupLocationName?: any;
  pickupLocationPersonTypeID?: any;
  pickupLocationPhone?: any;
  pickupLocationRelationshipID?: any;
  placementEstablishedDate?: any;
  placementNeededDate?: any;
  pregnant: any;
  primary_ReasonForRemovalID?: any;
  primaryLanguage?: any;
  priorAdoptions?: any;
  psychiatricEval = 0;
  reasonForDecline?: any;
  reasonForDeclineID?: any;
  receivedDateTime: any;
  recidivistDate?: any;
  recidivistDateOverride?: any;
  referralAcceptedID?: any;
  referralDate: any;
  father_DeceasedDate: any;
  mother_DeceasedDate: any;
  referralReasonID?: any;
  referralReasonID_Secondary?: any;
  referralTypeID: Referral;
  regPubSchool = 0;
  releaseDate: number;
  releaseOfInfo = 0;
  releaseReasonNote: string;
  retractedDate?: any;
  retractedReasonNote?: any;
  runaway = 0;
  runner: any;
  schoolRecs = 0;
  secondary_ReasonForRemovalID?: any;
  serviceTypeID?: any;
  sexualAbuse = 0;
  sexualAbused: any;
  sexualOffender: any;
  siblingPlacementFactors: any;
  socialHistory = 0;
  socialSecurityCard = 0;
  specialED = 0;
  specialEDType?: any;
  specialEDTypeUnknown = 0;
  specificCourtRecommend?: any;
  suicidal: any;
  suspectedAbuse = 0;
  transitionDate?: any;
  tribeID?: any;
  tribeNotified = 0;
  truancy = 0;
  vandalism: any;
  verbalAggression: any;
  withDrawDate?: any;
  withDrawReasonNote?: any;
  createdDate?: any;
  updatedDate?: any;
  lastModifiedDate?: any;
  isActive?: any;
  isDeleted?: any;
  fp_TransitionDate?: any;
  dhsnotifiedDate?: any;
  fp48HrContactDate?: any;
  dcfplanEndDate: number;
  fp24HrContactDate?: any;
  dhstrackingNumber?: any;
  csonotifiedDate?: any;
  prtf_BirthPlace?: any;
  prtf_Complexion?: any;
  rfc_TransitionDate?: any;
  srsareaOfficeID: number;
  prtf_ChurchPreference?: any;
  prtf_HairColor?: any;
  fp48Hr_StaffID?: any;
  fp24Hr_StaffID?: any;
  dcfbeginDate: number;
  dcfpriorMoves: number;
  erbeginDate?: any;
  fi_CaseID?: any;
  erendDate?: any;
  icwaapply = false;
  prtf_EyeColor?: any;
  facts: any;
  courtCaseNo: any;
  countyID: any;
  srsStaffID: any;
  srsLiasonID: any;
  staffID: any;
  familyMemberID: any;
  fmRelationShipID: any;
  motherName_FamilyMemberID: any;
  fatherName_FamilyMemberID: any;
  schoolID: any;
  galid: any;
  csvid: any;
  casaOfficerID: any;
  crbcoordinatorID: any;
  judgeID: any;
  fswID: any;
  communityMemberID: any;
  cmPersonTypeID: any;
  payorID: any;
  siblingplacementFactors: any;
  sfaStaffTypeID = 24;
  sfaOfficeID: any;
}

export class Siblings {
  name: string;
  dob: any;
  clientID: number;
  location: string;
}

export class RFCSpecialNeeds {
  behaviorsAndMedicalNeedsExplaination: any;
  referralID: number;
  mentalHealthDiagnosisID: any;
  crueltyToAnimalsID: any;
  verbalAggressionID: any;
  historyOfTheftID: any;
  psychotropicMedicationsID: any;
  intellectualOrDevelopmentalDisablityID: any;
  fireStarterID: any;
  historyOfChronicLyingID: any;
  poorSiblingOrPeerRelationsID: any;
  historyOfSuicidalIdeationOrAttemptsID: any;
  autismSpectrumDisorderID: any;
  destructionOfPropertyID: any;
  selfMutilationID: any;
  homicidalThreatsID: any;
  eatingDisorderID: any;
  runningAwayID: any;
  substanceDependentID: any;
  physicallyAggressiveToAdultsID: any;
  gangInvolvementID: any;
  sexualOffenderID: any;
  juvenileOffenderHistoryID: any;
  pregnantOrHasTheirOwnChildID: any;
  csecOrHtID: any;
  sexuallyActiveID: any;
  sexuallyReactiveID: any;
  sexualAbusevictimID: any;
  allergiesID: any;
  specialMedicalNeedsID: any;
  enuresisID: any;
  encopresisID: any;
  hivAidsID: any;
  medicallyFragileID: any;
  physicallyChallengedNonAmbulatoryID: any;
  specialDietaryNeedsID: any;
  visuallyImpairedID: any;
  hearingImpairedID: any;
  serviceAnimalID: any;
  epilepsyID: any;
  mentalHealthDiagnosisDesc: any;
  crueltyToAnimalsDesc: any;
  verbalAggressionDesc: any;
  historyOfTheftDesc: any;
  psychotropicMedicationsDesc: any;
  intellectualOrDevelopmentalDisablityDesc: any;
  fireStarterDesc: any;
  historyOfChronicLyingDesc: any;
  poorSiblingOrPeerRelationsDesc: any;
  historyOfSuicidalIdeationOrAttemptsDesc: any;
  autismSpectrumDisorderDesc: any;
  destructionOfPropertyDesc: any;
  selfMutilationDesc: any;
  homicidalThreatsDesc: any;
  eatingDisorderDesc: any;
  runningAwayDesc: any;
  substanceDependentDesc: any;
  physicallyAggressiveToAdultsDesc: any;
  gangInvolvementDesc: any;
  sexualOffenderDesc: any;
  juvenileOffenderHistoryDesc: any;
  pregnantOrHasTheirOwnChildDesc: any;
  csecOrHtDesc: any;
  sexuallyActiveDesc: any;
  sexuallyReactiveDesc: any;
  sexualAbusevictimDesc: any;
  allergiesDesc: any;
  specialMedicalNeedsDesc: any;
  enuresisDesc: any;
  encopresisDesc: any;
  hivAidsDesc: any;
  medicallyFragileDesc: any;
  physicallyChallengedNonAmbulatoryDesc: any;
  specialDietaryNeedsDesc: any;
  visuallyImpairedDesc: any;
  hearingImpairedDesc: any;
  serviceAnimalDesc: any;
  epilepsyDesc: any;
  specialNeedsID: any;
}
