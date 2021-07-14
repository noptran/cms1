export class CaseEvaluations {
    evaluationID: any;
    evaluationTypeID: number;
    evaluationVersionID: number;
    evaluationQuestionID: number;
    referralID: number;
    staffID: any;
    timeSpent: number;
    evaluationDate: any;
    evalutionScore = [];
    order: any;
    question: any;
    begindate: any;
    endDate: any;
    clarification: any;

  }
  
  export class EvalutionScore {
    evaluationQuestionID: number;
    score: number;
    notes: string;
    correctedScore: number;
    evaluationScoreID: number;
  }
  