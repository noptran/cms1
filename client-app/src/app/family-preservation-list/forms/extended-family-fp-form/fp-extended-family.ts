export class FpExtendedFamily {
    familyMemberID: any;
    beginDate: number;
    endDate: number;
    personTypeID: number;
    familyMemberTypeID: number;
    restrictionTypeID: number;
    IsCourtOrderedRestriction: boolean;
    frequencyTypeID: number;
    isCourtOrderedFrequency: boolean;
    notes: string;
    referralID: number;

    annualHouseholdIncome:any;
    numberLivingInHousehold:any;
    isSingleParentHousehold = false;
    familyRefused = false;
    isRemovalParent = false;

}
