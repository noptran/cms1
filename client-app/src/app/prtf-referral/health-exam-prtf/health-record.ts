export class HealthRecord {
  healthExamID: number;
  clientID: number;
  examDate: number;
  followUpRequired = false;
  healthExamTypeID: number;
  nextExamDue: number;
  notes: string;
  referralID: number;
}
