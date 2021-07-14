export class FpSupervisoryStaff {
    caseName: string;
    caseNumber: number;
    dateOfReferral: any;
    caseDate: any;

    listOfFis: string;
    extendedFamily: string;
    casePlanBeginDate: number;
    casePlanEndDate: number;
    safetyPlanBeginDate: number;
    safetyPlanTargetDate: number;
    caseActivityStaffingDate: number;
    caseActivityStaffingTime: number;
    reasonForReferral: string;
    previousSupervisoryStaffingDate: number;

    director: string;
    supervisor: string;
    caseManager: string;
    fpCaseManager: string;
    familySupportWorker: string;
    other: string;

    isMonthlySupervisory = false;
    isNewSafetyConcern = false;
    isIntensiveNonIntensive = false;
    isCaseClosure = false;
    isOtherSpecify = false;
    isNewIntake = false;

    familyStrengths: string;
    nonCustodialParent: string;
    narrative: string;

    isSafetyConcernsYes = false;
    isSafetyConcernsNo = false;

    isNewSafetyConcernsYes = false;
    isNewSafetyConcernsNo = false;
    isNewSafetyConcernsNa = false;

    safetyConcerns: string;

    isRiskConcernsYes = false;
    isRiskConcernsNo = false;


    isAddressRiskYes = false;
    isAddressRiskNo = false;
    isAddressRiskNa = false;

    additionalRiskConcerns: string;

    nextSteps: string;

    fpSupervisor: string;
    dateEndSign: number;
}
