export class UnusualIncident {
  unusualIncidentID: any;
  referralID: any;
  reportID: string;
  incidentDate: any;
  discoveryDate: any;
  payorID: any;
  client_SFAOfficeID: any;
  providerID: any;
  provider_SFAOfficeID: any;
  sponsorID: any;
  staff_InjuryTypeID: any;
  client_InjuryTypeID: any;
  incidentDescription: string;
  followUpNeeded: any;
  recommendations: string;
  followUpCompletedDate: any;
  reporting_StaffID: any;
  completedDate: any;
  unusualIncidentAnonymityTypeID: any;
  client: any;
  unusualIncidentCriticalID: any[];
  unusualIncidentSignificantID: any[];
  unusualIncidentIncidentTypeID: any[];
  unusualIncidentAdultInvolvedID: any[];
  unusualIncidentNotificationID: any[];
  unusualIncidentChildrenLivingInTheHomeID: any[];
  personId: any;
  allowStaffToEdit = false;
  boardReviewDate: any;
  fieldAvailableDate: any;
  response: any;
  rmFollowUpCompletedDate: any;
  substantiatedAbuseNeglect: any;
  isUnanticipatedMedicalAttention: any;
}
export class printUnusualIncident {
  incidentDate: any;
  recommendations: any;
  followUpNeeded: any;
  providerID: any;
  payorID: any;
  reportID: any;
  reporting_StaffID: any;
  unusualIncidentAnonymityTypeID: any;
  incidentDescription: any;
  dob: any;
}

export class FormTrackerDetails { 
  enteredBy: string;
  enteredDate: string;
  changedDate: string;
  changedBy: string;
}
