export class BestIntrestingStaff {
    bestInterestStaffingID: number;
    requested: any;
    completed: any;
    notes: String;
    referralID: any;
    bestInterestStaffingProviderID: BisResource[];
}
export class BisResource {
    bestInterestStaffingProviderID: any;
    providerID: any;
    selected = false;
    providerNotified: any;
    srsSent: any;
    srsApproved: any;
    srsNotApproved = false;
    icpc = false;
    appealed = false;
    appealResults_StatusTypeID: any;
    notes: String;
}
