export class FpTherapyDischarge {
    name: string;
    recordNumber: string;
    dischargeDate: number;
    treatmentPeriod: string;
    numberOfSessions: string;
    problemArea: string;

    isEvaluationCompleted = false;
    isTreatmentCompleted = false;
    isMemberMoved = false;
    isTreatmentNotCompleted = false;
    isMemberDischarged = false;
    isTreatmentMemberNotCompleted = false;
    isDeathOfMember = false;
    isTransferToAlternative = false;

    treatmentSummary: string;
    dischargePlan: string;

    code: string;
    principalFirst: string;

    code1: string;
    principalFirst1: string;

    code2: string;
    principalFirst2: string;

    code3: string;
    principalFirst3: string;

    code4: string;
    principalFirst4: string;

    code5: string;
    principalFirst5: string;

    code6: string;
    principalFirst6: string;

    code7: string;
    principalFirst7: string;

    code8: string;
    principalFirst8: string;

    principalFirst9: string;

    isPrognosGood = false;
    isPrognosFair = false;
    isPrognosGuarded = false;
    isPrognosJustification = false;

    prognosisAtDischarge: string;
    therapistPrintedName: string;
    therapistSignature: string;
    signatureDate: number;







}
