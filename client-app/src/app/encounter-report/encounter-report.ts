export class EncounterReport {
        beginDate: any;
        endDate: any;
        submitDate: any;
        oneYearAgo: number;
        payorID: number;
        enteredBy: string;
        userID: number;
        isCreatePlacement = 0;
        isCreateLivingArrangement = 0;
        isCreateCaseActivity = 0;
        isCreateClaim = 0;
        isAuthorizationFilter = 0;
        authorizationFilter?: any;
        isKAECSESFilter = 0;
        kAECSESFilter?: any;
        errorsOnly = 0;
}
