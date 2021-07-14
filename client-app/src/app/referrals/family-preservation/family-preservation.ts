export class FamilyPreservation {
  clientID: number;
  facts: string;
  receivedDateTime?: any;
  referralDate?: any;
  explanation: string;
  officeFile: number;
  mma: number;
  fileIssueDate?: any;
  file_StaffID: number;
  annualHouseholdIncome: number;
  fp24HrContactDate?: any;
  numberLivingInHousehold: number;
  fp48HrContactDate?: any;
  isSingleParentHousehold = false;
  familyRefused = false;
  closureDate?: any;
  withDrawDate?: any;
  withDrawReasonNote: string;
  closureReasonID: number;
  notes: string;
  fp24Hr_StaffID: number;
  fp48Hr_StaffID: number;
  referralReasonID: number;
  referralReasonID_Secondary: number;
  personID: any;
  personTypeID: any;
  payorID: number;
  fis = [];
  dcfPersonID: any;
  referralID: any;
  countyID: any;
  onRadar = false;
  referralTypeID: any;
  enteredBy: any;
}

export class FISMember {
  clientID: any;
  personTypeID = false;
  isCaseHead = false;
  pws = false;
}

export class Mail {
  to: any;
  cc: any;
  bcc: any;
  subject: any;
  content: any;
  attachment: any;
}

export class AcknowledgmentForm {
  toMember: string;
  provideCaseManager: string;
  isInitiated = false;
  isReinstated = false;
  isCopyCorrected = false;
  isDrugResultsObtained = false;
  caseHeadName: string;
  caseHeadDob: number;
  clientId: number;
  factsCase: string;
  courtCase: any;
  referralDateReceived: number;
  providerStaff: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  workerPhone: any;
  accessPhone: any;
  clientName: string;
  clientDob: number;
  isNotLiveBirth = false;
  sex: string;
  race: string;
  ethnicity: string;
  tribe: string;
  drugToxicology: any;
  testDate: number;
  isNegativeDrugs = false;
  isNotTested = false;
  isPositiveResult = false;
  typeForPositiveResults: string;
  isDcfReleased = false;
  dcfReleased_1: String;
  dcfReleased_2: String;
  isInitialPhaseConcluded = false;
  initialPhaseConclusion_1: string;
  initialPhaseConclusion_2: string;
  isSubPhaseConcluded = false;
  isResponsibilityConcluded = false;
  responsibilityConclusion_1: string;
  responsibilityConclusion_2: string;
  isVenueChanged = false;
  venueChange_1: string;
  venueChange_2: string;
  isServicesEnded = false;
  fpServicedEnd: string;

}

