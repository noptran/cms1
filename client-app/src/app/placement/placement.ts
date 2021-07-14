export class Placement {
  clientID: any;
  providerID: any;
  procodeID: any;
  referralID: any;
  beginDate: any;
  endDate: any;
  reasonForMoveID: any;
  behaviors: any;
  reasonForMove_PR: any;
  placementReferralID: any;
  initiatedByStaffID: any;
  notes: any;
  reminderNote: any;
  enteredBy: any;
  enteredDate: any;
}

export class authorization {
  clientID: any;
  providerID: any;
  referralID: any;
  beginDate: any;
  endDate: any;
  livingArrangementID: any; //Missing
  providerLocationID: any; //Missing
  payorID: any;
  sponsorID: any; //Missing
  procodeID: any;
  authorizationStatusID: any;
  unitTypeID: any; //Missing
  unitsAuth: any; //Missing
  unitsRemaining: any; //Missing
  unitsPaidByPlacement: any;
  payorRate: any;
  providerRate: any;
  doNotPay: any;  //Missing
  paySponsor: any;
  exception: any;
  payorAuthorizationID: any;
  notes: any;
  holdBedPayorID: any; //Missing
  holdBedUnits: any;
  enteredBy: any;
  enteredDate: any;
}

export class respiteAuthorization {
  unitsPerMonth: any;
  payorID: any;
  beginDate: any;
  endDate: any;
  notes: any;
  reminderNote: any;
  enteredBy: any;
  enteredDate: any;
}

export class placementDetail {
  addInfo: any;
  adopt = false;
  adoptDate: any;
  authorizationID: any;
  awol = false;
  beginDate: any;
  change = false;
  changedBy: string;
  changedDate: any;
  changeOfVenue = false;
  changeOfVenueDate: any;
  clarification: any;
  clientID: any;
  correctedCopy = false;
  death = false;
  deathDate: any;
  disruption = false;
  endDate: any;
  enteredBy: string;
  enteredDate: any;
  guardAndNotReld = false;
  guardAndNotReldDate: any;
  guardAndReld = false;
  guardAndReldDate: any;
  ilp = false;
  inHome = false;
  initial = false;
  isOOH = false;
  isPlacedWSib = false;
  isSibOOH = false;
  jja = false;
  levelDown: any;
  medicalCard = false;
  other = false;
  otherRel = false;
  otherRelDate: any;
  paymentBeginDate: any;
  paymentEndDate: any;
  payorID: any;
  placementID: any;
  plannedMove = false;
  prePlacement = false;
  procodeID: any;
  providerAddressChange = false;
  providerID: any;
  providerLocationID: any;
  reasonForMoveID: any;
  referralID: any;
  refToAdopt = false;
  refToAdoptDate: any;
  reinstatement = false;
  relationshipToChild_PersonTypeID: any;
  reprint: any;
  respite = false;
  respiteTypeID: any;
  retHomeWCustody = false;
  retHomeWCustodyDate: any;
  retHomeWOCustody = false;
  retHomeWOCustodyDate: any;
  returnFromRespite = false;
  scriptsFlag: string;
  siblingReasonID: any;
  sibsAffectedByMove: any;
  sixtyDay = false;
  sixtyDayDate: any;
  sponsorID: any;
  swapPay = false;
  terminateReason: any;
  thirtyDay = false;
  trialHomePlacement = false;
  tribalCourt = false;
  tribalCourtDate: any;
  createdDate: any;
  updatedDate: any;
  lastModifiedDate: any;
  isActive: any;
  isDeleted: any;
  dcfnewReferral = false;
  dcfplanEndDate: any;
  dcfplanEndDateOverride: any;
  dcfplanEndDateOverrideID: any;
  dcfreleasedOfCustodyDate: any;
  dcfreleasedOfCustodyID: any;
  fchadmissionID: any;
  kipp_ReunificationEmailed = false;
  srsreldOfCustody = false;
  srsreldOfCustodyDate: any;
  sRSServiceCodeID: any;
  AComplete = false;
  ACompleteDate: any;
  ilpdate: any;
  jjaDate: any;
  SFANotes: any;
  dcfreleasedOfCustodyOverrideDate: any;
  dcfreleasedOfCustodyOverrideID: any;
  formReceivedDate: any;
  ilpPDate: any;
  kIPPReunificationEmailed: any;
  legacy_Resend = false;

}

export class PlacementEdit {
  reminderNotes: any;
  placementID: any;
  beginDate: any;
  endDate: any;
  providerID: any;
  placementReferral: any;
  reasonForMoveID: any;
  initiatedByStaffID: any;
  behaviors: any;
  reasonForMove_PR: any;
  notes: any;
  referralDates: {
    referralDate: any;
    paymentEndDate: any;
    retractedDate: any;
    retractedReasonNote: any;
    withDrawDate: any;
    withDrawReasonNote: any;
    releaseDate: any;
    releaseReasonNote: any;
    closureDate: any;
    closureReasonNote: any;
    dualAdj_BeginDate: any;
    dualAdj_EndDate: any;
    dCFPlanEndDate: any;
    dCFBeginDate: any;
    dCFPriorMoves: any;
    recidivistDate: any;
    recidivistDateOverride: any;
  };
  reminderNote: any;
  respiteAuthorization: [
    {
      respiteAuthorizationID: any;
      unitsPerMonth: any;
      beginDate: any;
      endDate: any;
      payor: any;
      notes: any;
      placementID: any;
    }
  ];
  placementAuthorization: [
    {
      authorizationID: any;
      placementDetailID: any;
      status: any;
      unitsAuth: any;
      unitsRemaining: any;
      payorRate: any;
      providerRate: any;
      beginDate: any;
      endDate: any;
      doNotPay: any;
      paySponsor: any;
      notes: any;
    }
  ];

  placementClaims: [
    {
      claimID: number;
      status: string;
      paidAgency: string;
      units: number;
      payorRate: number;
      totalPayorRate: number;
      providerRate: number;
      totalProviderRate: number;
      beginDate: number;
      endDate: number;
      receivedDate: number;
      expectedPaymentDate: number;
      postedDate: number;
      recoupClaimID: any;
      enteredBy: string;
      enteredDate: number;
      changedBy: string;
      changedDate?: any;
    }
  ]

}

export class PlacementBehavioursUpdate {
  behavior: string;
  changedBy: any;
  changedDate: any;
}

export class ReferralDates {
  referralID: any;
  referralDate: any;
  closureDate: any;
  closureReasonNote: any;
  releaseDate: any;
  releaseReasonNote: any;
  withDrawDate: any;
  withDrawReasonNote: any;
  retractedDate: any;
  retractedReasonNote: any;
  paymentEndDate: any;
  dualAdjBeginDate: any;
  dualAdjEndDate: any;
  dCFPlanEndDate: any;
  dCFBeginDate: any;
  dCFPriorMoves: any;
  changedBy: any;
  changedDate: any;
  recidivistDate: any;
  recidivistDateOverride: any;
}

export class DisruptionUpdate {
  disruptionID: any;
  disruptionTypeID: any;
  disruptionReasonID: any;
  prev_PlacementID: any;
  otherOptOffered = false;
  staffID: any;
  providerID: any;
  changedBy: any;
  changedDate: any;
}

export class PlacementMoveEventUpdate {
  moveEventID: any;
  isDeletePlacement: any;
  changedBy: any;
  changedDate: any;
}

export class IdentifiedResourceUpdate {
  referralID: any;
  procodeID: any;
  providerID: any;
  beginDate: any;
  endDate: any;
  enteredBy: any;
  enteredDate: any;
}

export class AuthorizationException {
  acomplete
  originalPayorRate: any;
  originalProviderRate: any;
  exceptionPayorRate: any;
  exceptionProviderRate: any;
  approvedBy_StaffID: any;
  requestedBy: any;
  explanationOfNeed: any;
  authorizationID: any;
  authorizationExceptionReasonID: any;
}

export class Disruption { 
    disruptionTypeID: any;
    prev_PlacementID: any;
    disruptionReasonID: any;
    otherOptOffered =false;
    staffID: any;
    providerID: any;
    enteredBy: string;
    enteredDate: any;
}
