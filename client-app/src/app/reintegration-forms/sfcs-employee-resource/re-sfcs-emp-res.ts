export class ReSfcsEmpRes {
    EmployeeName: string;
    CurrentPosition: string;
    SponsoringAgency: string;
    ChildName: string;
    ChildOffice: string;
    StartEndDates: number;
    SummaryPlacement: string;
    DualRelationshipConcerns: string;
    MinimizeRiskSteps: string;
    OtherInformation: string;

    SignatureStaffComplete: string;
    DateCompleted: number;
    SignatureSupervisor: string;
    Date: number;

    IsDecisionApproved = false;
    IsDecisionDenied = false;

    Decision: string;

    ChildCaseAvp: string;
    EmployeeResourceParentAvp: string;
    ClinicalDirector: string;
    EmployeeResourceParentVp: string;
    ChildCaseVp: string;
    DateReviewed: number;
}
