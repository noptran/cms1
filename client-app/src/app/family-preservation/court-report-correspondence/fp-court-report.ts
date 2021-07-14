export class FpCourtReport {
    children: string;
    dateOfBirth: any;
    dateOfReport: any;
    dateOfHearing: any;
    dateOfReferral: any;
    gal: string;
    mother: string;
    attorneyForMother: string;
    motherCurrentAddress: string;
    father: string;
    attorneyForFather: string;
    fatherCurrentAddress: string;
    periodCoveredByReport: string;
    periodCoveredByReportto: string;
    therapist: string;
    phone: number;
    courtReport: string;
    progressSummary: string;
    other: string;
    deliveredTo: string;
    // dateOfDelivery: number;

    isJudge = false;
    isGal = false;
    isMotherAttorney = false;
    isFatherAttorney = false;
    isCountyAttorney = false;
    isOtherAttorney = false;
    isOther = false;
    isCasa = false;

    judgeDate: number;
    galDate: number;
    motherAttorneyDate: number;
    fatherAttorneyDate: number;
    countyAttorneyDate: number;
    otherAttorneyDate: number;
    otherDate: number;
    casaDate: number;
    caseName: any;
}
