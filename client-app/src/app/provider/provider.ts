
export class ProviderMemberProviderID {
    member: any;
    personType: any;
    primaryContact = false;
    beginDate: any;
    endDate: any;
    notes: string;
}

export class ProviderLocationID {
    providerLocationTypeID: any;
    address1: string;
    address2: string;
    stateID: any;
    countyID: any;
    zipcodeID: any;
    phone: string;
    fax: string;
    beginDate: any;
    endDate: any;
    locationHeader: string;
    notes: string;
    cityID: any;
    isServiceAdressForBillingAddress = false;
}

export class ProviderPreferenceID {
    youngestAge: number;
    oldestAge: number;
    raceID: number;
    genderGroupID: number;
    capacity: number;
    ageIsFlexible = false;
    raceIsFlexible = false;
    genderIsFlexible = false;
    respiteOnly = false;
    onHoldCapacity: number;
    willTakeRespite = false;
    notes: string;
}

export class ProviderSponsorID {
    sponsorID: number;
    beginDate: any;
    endDate: any;
    notes: string;
}

export class ProviderSFAStaffID {
    personTypeID: number;
    staffID: number;
    beginDate: any;
    endDate: any;
    notes: string;
}

export class ProviderStatusID {
    providerStatusTypeID: number;
    beginDate: any;
    endDate: any;
    notes: string;
}

export class SfaofficeActivityID {
    sfaofficeID: number;
    beginDate: any;
    endDate: any;
}

export class ProviderSchoolID {
    beginDate: any;
    endDate: any;
    schoolID: any;
    notes: any;
}

export class Provider {
    providerName: string;
    acronym = false;
    providerTypeID: number;
    beginDate: any;
    endDate: any;
    email: string;
    dayCareTypeID: number;
    venderID: string;
    fedTaxNo: string;
    medicaidNo: string;
    trainingCompleted_NCFCHOK: number;
    dhsFamilyIntroID: number;
    dhsPreResourceID: string;
    dhsResourceID: string;
    dhsRegionID_Override: number;
    dtDate: number;
    daycareHoursRequired: number;
    fchWebTermSignDate: any;
    fchWebElectronicSignatureOptOutDate: any;
    paySponsor = false;
    paySemiMonthly = false;
    isSponsor = false;
    claris: string;
    employee2_StaffID: number;
    referralSourceCategoryID: number;
    referralSourceTypeID: number;
    referralSourceComments: string;
    notes: string;
    bestTimeToContact: string;
    maritalStatusID: number;
    incomeRangeID: number;
    providerMemberProviderID: ProviderMemberProviderID[];
    providerLocationID: ProviderLocationID[];
    providerPreferenceID: any;
    providerSponsorID: ProviderSponsorID;
    providerSFAStaffID: ProviderSFAStaffID;
    providerStatusID: ProviderStatusID;
    sfaofficeActivityID: SfaofficeActivityID;
    providerSchoolID: ProviderSchoolID[];
    staffID: any;
    isSFCSEmployee = false;
}


