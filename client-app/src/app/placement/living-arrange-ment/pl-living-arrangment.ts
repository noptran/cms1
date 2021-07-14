export default class LivingArrangment {
    livingArrangementID: any;
    beginDate: any;
    endDate: any;
    formReceivedDate: any;
    providerID: any;
    procodeID: any;
    frequency: any;
    payPlacement = false;
    correctedCopy = false;
    medicalCard = false;
    inHome = false;
    clarification: any;
    addInfo: any;
    sfaNotes: any;
    placementID: any; 
    respitePlanned = false;
    respiteUnplanned = false;
    respiteTransitional = false;
    authorization: Authorization;
    respiteTypeID: any;
}

export class Authorization {
    unitsAuth: any;
    unitsPaidByPlacement: any;
    dateOverride = false;
    endAuthorizationEndDateDate: any;
    payorRate: any;
    providerRate: any;
    paySponsor = false;
    payorID: any; 
    authorizationStatusID: any;
    holdBedUnits: any;
    holdBedPayorID: any;
    authorizationExceptionID: any;
    notes: any;
    endDate: any;
    beginDate: any;
    exception = false;
    doNotPay = false
    clientID : any
    unitTypeID = 1; //Daily
    referralID: any;
}

export class AuthorizationException { 
    authorizationExceptionReasonID: any;
    originalPayorRate: any;
    originalProviderRate: any;
    exceptionPayorRate: any;
    exceptionProviderRate: any;
    approvedBy_StaffID: any;
    requestedBy: any;
    explanationOfNeed: any;
}
