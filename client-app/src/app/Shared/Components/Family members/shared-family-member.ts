export class SharedFamilyMember {
    familyMemberID: any;
    beginDate: any;
    endDate: any;
    personTypeID: any;
    familyMemberTypeID: any;
    restrictionTypeID: any;
    IsCourtOrderedRestriction = false;
    frequencyTypeID: any;
    isCourtOrderedFrequency = false;
    notes: string;
    referralID: number;
    annualHouseholdIncome: any;
    numberLivingInHousehold: any;
    isSingleParentHousehold = false;
    familyRefused = false;
    isRemovalParent = false;
    familyMemberReferralID: number;
    custodialParent = false;
    prt = false;
    contactList = false;
    emergencyContact = false;
    treatmentplan = false;
    treatmentDecisions = false;
}