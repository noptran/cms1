import { OpencardsService } from "../opecards-list-view/opencards.service";


export class MoveForm {
  constructor(public _opencard: OpencardsService) { }

  moveEventID: number
  clientID = parseInt(localStorage.getItem('clientId')) - this._opencard.getHasKey();
  providerID_From?: any;
  moveActionID: any;
  requestedDate: number;
  // moveNeededDate: number;
  moveNeededDate: Date;
  departureDate: Date;
  requestReasonID: number;
  clientLocationID: number;
  reasonForMove_Notes: string;
  medications_Notes: string;
  schoolAppointments_Notes: string;
  isInitiatedByCC = false;
  isInitiatedByFieldStaff = false;
  personTypeID_MoveInitiatedBy: number;
  staffID_MoveInitiatedBy: number;
  providerID_MoveTo: any;
  referralID = parseInt(localStorage.getItem('referralId')) - this._opencard.getHasKey()
  isProviderFromIncorrect = false;
  moveActionDate: any;
  moveStatusID: any;
  arrivalDate: Date;
  statusDate: Date;
  personTypeID_IfRelative: any;
  relativeType: any;
  isPersonTypeID_IfRelative = false;
  schoolID_MoveTo: any;
  providerLocationID_From: any;
  providerLocationID_MoveTo: any;
  schoolID_From: any;
  placementID_From: any;
  placementID_MoveTo: any;
  placementDetailID_From: any;
  placementDetailID_MoveTo: any;
  newProvider_MoveTo: any;
  enteredBy: any;
  enteredDate: any;
  providerAddressChange: any;


}

export class ChangeAddress {
  pcSiteOtherProviderID: any;
  serviceAddress: any;
  cityID: any;
  stateID: any;
  zipcodeID: any;
  phone: String;
  email: String;
  FullAddress: any;
}

export class MoveAutoFillData {
  clientname: string;
  kaecses: string;
  CourtCaseNo: string;
  CaseMGMT_Office: string;
  PCSiteOtherProviderID: number;
  ProviderLocid: number;
  ProviderName: string;
  DepartureDate: string;
  DepartureTime: string;
  FullAddress: string;
  Phone: string;
  SchoolName: string;
  USD: string;
  ReasonNotes1: string;
  ScheduledAppointment1: string;
  MedicationNotes1?: any;
  FacilityName: string;
  FacilityAddress: string;
  MoveToPhone: string;
  Sponsor: string;
  RelativeType: string;
  NameOfSchool: string;
  SchoolDistrict: string;
  ArrivalDate: string;
  ArrivalTime: string;
  SignedBy: string;
  SignedDate: number;
  DisruptionReason: string;
  DisruptionBehaviors: string;
  providerToAddress: any;

}

export class NewproviderAddress {
  providerName: string;
  phone: string;
  address: string;
}

export class NewProvider {
  pCSiteOtherProviderID: any;
  otherProviderName: any;
  clientID: any;
  serviceAddress: any;
  phone: any;
  email: any;
  cityID: any;
  stateID: any;
  zipcodeID: any;
  providerTypeID: any;
  relativeTypeID: any;
  primaryRaceID: any;
  primaryGenderID: any;
  secondaryRaceID: any;
  secondaryGenderID: any;
  primaryMemberName: any;
  primarySSN: any;
  secondaryMemberName: any;
  secondarySSN: any;
  primaryDOB: any;
  secondaryDOB: any;
  enteredBy: any;
  changedBy: any;
}
