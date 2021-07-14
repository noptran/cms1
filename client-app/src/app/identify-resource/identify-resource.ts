export class IdentifyResource {
    identifiedResourceID: number;
    attorneyPacket?: any;
    beginDate: number;
    changedBy: string;
    changedDate: number;
    closureReasonID: any;
    consentSentDate?: any;
    consentSignedDate: number;
    endDate: number;
    enteredBy: string;
    enteredDate: number;
    fileRead?: any;
    identifiedResourceTypeID: any;
    isTransitionPlan: boolean;
    notes?: any;
    placementID: any;
    providerID: any;
    referralID: any;
    subsidyReferralDate?: any;
    transitionPlan?: any;
    createdDate?: any;
    updatedDate?: any;
    lastModifiedDate?: any;
    isActive?: any;
    isDeleted?: any;
    apaDate: number;
}

export class IdentifyResourceUpdateData {
    apaDate: any;
    attorneyPacket?: any;
    beginDate?: any;
    endDate: any;
    closureReasonID: number;
    consentSentDate?: any;
    consentSignedDate?: any;
    fileRead?: any;
    identifiedResourceID: number;
    identifiedResourceTypeID: number;
    isTransitionPlan: boolean;
    notes?: any;
    referralID: number;
    subsidyReferralDate?: any;
    providerID: number;
    transitionPlan: any;
}
