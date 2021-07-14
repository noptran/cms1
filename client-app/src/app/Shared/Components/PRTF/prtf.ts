export class PRTFClientInfo {
    clientID: number;
    firstName: string;
    lastName: string;
    mi: string;
    dob: string;
    gender: string;
    race: string;
    ssn: string;
    kaecses: string;
    address: string;
    city: string;
    zipcode: string;
    countyName: string;
    state: string;
    medicaid: string;
    allergies: string;
    tribe: string;
    ethnicity: string;
    isNotLiveBirth: boolean;
    clientAllergiesID: number;
    medicalConditions: string;
    alternateID: string;
    clientMedicalConditionsID: number;
    payorID: number;
    payorPersonID: any;
    payorPersonAssignmentTypeID: number;
    payorSource: string;
}

export class PRTFYouthAdditionalInfo {
    pRTF_EyeColor: string;
    pRTF_HairColor: string;
    pRTF_Complexion: string;
    pRTF_BirthPlace: string;
    currentGrade: string;
    primaryLanguage: string;
    pRTF_ChurchPreference: string;
    isUSCitizen = true;
    citizenship: string;
    dischargeTo: string;
    dischargeDate: any;
    dischargeReasonID: any;
    caseID: number;
    height: number;
    weight: number;
}

export class PRTFReferralInfo {
    clientID: number;
    payorID: any;
    beginDate: any;
    referralID: number;
    payor_personID: any;
    payor_PersonAssignmentTypeID: any;
    payorSource: string;
    medicalConditions: string;
    clientAllergiesID: any;
}