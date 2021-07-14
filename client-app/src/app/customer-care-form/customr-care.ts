export class CustomrCare {
    custCareReportID: number;
    reportID: string;
    reportDate: number;
    customerCareStaffID: string;
    custCareNotificationTypeID: number;
    custCareGeneralConcernID: number;
    overview: string;
    resolvedDate: number;
    resolution: string;
    custCareClientInvolvedID: CustCareClientInvolvedID[];
    custCareStaffInvolvedID: CustCareStaffInvolvedID[];
    programTypeID: any;
    custCareReportTypeID: number;
    custCareParticipantID: any;
    personId: any;
}

export class CustCareClientInvolvedID {
    custCareClientInvolvedID: number;
    clientID: number;
}

export class CustCareStaffInvolvedID {
    custCareStaffInvolvedID: number;
    staffID: number;
}
