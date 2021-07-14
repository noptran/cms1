export class ProviderMember {
    cellPh: any;
    changedBy: string;
    changedDate: number;
    email: any;
    enteredBy: string;
    enteredDate: number;
    firstName: string;
    genderID: any;
    lastName: string;
    mi: string;
    notes: string;
    fax: number;
    suffix: any;
    ssn: number;
    address: string;
    pager: number;
    tribeID: any;
    ethnicityID: any;
    raceID: any;
    ext: number;
    workPh: number;
    homePh: number;
    dob: number;
    acronym: boolean;
    deceased: any;
    contract_StateID: any;
    isChild: boolean;
    employer: any;
    occupation: any;
    employmentStatus: any;
    lengthOfEmployment: any;
    primaryLanguageID: any;
    secondaryLanguageID: any;
    educationLevelID: any;
    isUSCitizen: boolean;
    citizenship: any;
    religionID: any;
    denomination: any;
    employmentStatusID: any;
}

export class ProviderMemberStatus {
    personTypeID: any;
    primaryContact=false;
    beginDate: any;
    endDate: any;
    notes = null;
    providerID: number;
    providerMemberID: number;
    providerMemberProviderID: number;
    providerMemberChildrenID: number;
}
