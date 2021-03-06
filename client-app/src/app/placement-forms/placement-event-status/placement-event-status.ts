export class PlacementEventStatus {
  client: any;
  dob: string;
  ssn: any;
  clientCourt: any;
  facts: any;
  kaecses: any;
  clientGender: any;
  payorName: any;
  payorAddress: any;
  payorCity: any;
  payorState: any;
  payorZipCode: any;
  payorPhone: any;
  payorFax: any;
  placementName: any;
  placementBeginDate: any;
  sponsor: string;
  reasonForMove: any;
  authBeginDate: string;
  authEndDate: string;
  payRate: any;
  staffName: string;
  fswName: string;
  fcwPhone: any;
  _Cur_PE_pEventName: any;
  _Cur_PE_pEventDate: string;
  _Cur_PE_pEventAddress: any;
  _Cur_PE_pEventPhone: any;
  _Cur_PE_pEventCity: any;
  _Cur_PE_pEventZip: any;
  _Cur_PE_pEventState: any;
  _Cur_PE_pEventSponsorName: any;
  _Cur_PE_pEventLOC: any;
  _Prev_PE_pEventName: any;
  _Prev_PE_pEventBeginDate: string;
  _Prev_PE_pEventEndDate: string;
  _Prev_PE_pEventAddress: any;
  _Prev_PE_pEventPhone: any;
  _Prev_PE_pEventCity: any;
  _Prev_PE_pEventZip: any;
  _Prev_PE_pEventState: any;
  curPEventOverallAddress: any;
  prevPEventOverallAddress: any;
}

export class PlacementPSAPrintPreview {
  ClientID: number;
  AuthorizationID: number;
  ClientName: string;
  DOB: string;
  SSN: string;
  Court: string;
  Facts: string;
  Kaecses: string;
  Gender: string;
  PayorName: string;
  PayorAddress: string;
  PayorCity: string;
  PayorState: string;
  PayorZipcode: string;
  PayorPhone: string;
  PayorFax: string;
  PayorRate: string;
  FCHStaffName: string;
  FCHStaffAddress: string;
  FCHStaffCity: string;
  FCHStaffState: string;
  FCHStaffZipcode: string;
  FCHStaffPhone: string;
  ProviderName: string;
  CurrentPlacementBeginDate: string;
  ProviderAddress: string;
  ProviderCityStateZip: string;
  ProviderPhone: string;
  Procode: string;
  ProviderRate: string;
  SponsorName: string;
  AddInfo: string;
  ReasonForMove: string;
  PrevProviderName?: any;
  PrevPlacementBeginDate?: any;
  PrevPlacementEndDate?: any;
  PrevProviderAddress?: any;
  PrevProviderCityStateZip?: any;
  PrevProviderPhone?: any;
  PrevProcode?: any;
  PrevProviderRate?: any;
  PrevPayorName?: any;
  PrevSponsorName?: any;
  DischargeDate?: any;
  DateTime: number;
  Subject_ClientName: string;
  Subject_CountyCode: string;
  Subject_ReferralType: string;
  ProviderID: number;
  ReferralTypeID: number;
  LivingArrangement: boolean;
  PayorAuthorizationID: number;
  printPreviewData: any;
}
