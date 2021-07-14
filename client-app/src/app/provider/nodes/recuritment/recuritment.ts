export class Recuritment {
  "inquiryDate": any;
  "recruitmentInquirySourceID": any;
  "inquiryClosedDate": any;
  "recruitmentRejectionReasonID": any;
  "infoPacketMailedDate": any;
  "notes": any;
  "providerID": any;
  "changedBy": any;
  "enteredBy": any;
  "changedDate": any;
  "enteredDate": any;
  "recruitmentInquiryEvent": recruitmentInquiryEvent[];
  referralCompletedDate : any;
}
export class FollowUpActivity {
  eventID: any;
  dueDate: any;
  completedDate: any;
  completedBy: any;
  notes: any;
}

export class recruitmentInquiryEvent {
  "recruitmentInquiryEventTypeID": any;
  "notes": any;
  "completedBy": any;
  "changedBy": any;
  "enteredBy": any;
  "changedDate": any;
  "completedDate": any;
  "dueDate": any;
  "enteredDate": any;
  "isOverdueReminderSent" = false;
  "isReminderSent" = false;
}

