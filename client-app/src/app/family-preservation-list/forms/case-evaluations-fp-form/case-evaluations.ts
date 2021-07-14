export class CaseEvaluations {
  evaluationID: any;
  evaluationTypeID: number;
  evaluationVersionID: number;
  referralID: number;
  staffID: any;
  timeSpent: number;
  evaluationDate: any;
  evalutionScore = [];
}

export class EvalutionScore {
  evaluationQuestionID: number;
  score: number;
  notes: string;
  correctedScore: number;
  evaluationScoreID: number;
}
