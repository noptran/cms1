export class FpMentalHealth {
    caseHeadName: string;
    clientName: string;
    factsNumber: number;
    dob: any;
    casePlanDate: number;
    mhaDate: number;
    locationOfAssessment: string;

    faceToFace = false;
    telemedicine = false;
    interactiveComplexity = false;

    noMedical: number;
    withMedical: number;
    psychotherapy16Min: number;
    psychotherapy38Min: number;
    psychotherapy53Min: number;
    psychotherapyNoPatient: number;
    familyPsychotherapy: number;
    familyPsychotherapyHome: number;
    groupPsychotherapy: number;
    testingByPsychologist: number;
    testingByTechnician: number;
    testingByComputer: number;
    conferenceNonPhysician: number;
    conferenceAbsencePhysician: number;
    conferenceAbsenceNonPhysician: number;

    noMedicalUnits: string;
    withMedicalUnits: string;
    psychotherapy16MinUnits: string;
    psychotherapy38MinUnits: string;
    psychotherapy53MinUnits: string;
    psychotherapyNoPatientUnits: string;
    familyPsychotherapyUnits: string;
    familyPsychotherapyHomeUnits: string;
    groupPsychotherapyUnits: string;
    testingByPsychologistUnits: string;
    testingByTechnicianUnits: string;
    testingByComputerUnits: string;
    conferenceNonPhysicianUnits: string;
    conferenceAbsencePhysicianUnits: string;
    conferenceAbsenceNonPhysicianUnits: string;

    cpt: string;
    description: string;
    unitValue: string;
    outpatientTherapytime: number;
    units: string;
    charge: string;

    diagnosisCode: string;
    // principalFirst: string;
    complexityDescription: string;

    diagnosisCode1: string;
    complexityDescription1: string;
    diagnosisCode2: string;
    complexityDescription2: string;
    diagnosisCode3: string;
    complexityDescription3: string;
    diagnosisCode4: string;
    complexityDescription4: string;

    nameOfProvider: string;
    chargeAmount: number;
    startTime: number;
    stopTime: number;
    totalTime: number;
    relationshipToClient: string;
    presentingProblems: string;
    pertinentHistory: string;
    milestonesMet: string;
    milestonesNotMet: string;
    milestonesDescription: string;

    isOutpatient = false;
    agencyOutpatient: string;
    dateOfServiceOutpatient: number;
    reasonOutpatient: string;
    interventionOutpatient: string;
    responseOutpatient: string;

    agencyOutpatient1: string;
    dateOfServiceOutpatient1: number;
    reasonOutpatient1: string;
    interventionOutpatient1: string;
    responseOutpatient1: string;

    agencyOutpatient2: string;
    dateOfServiceOutpatient2: number;
    reasonOutpatient2: string;
    interventionOutpatient2: string;
    responseOutpatient2: string;

    isInpatient = false;
    agencyInpatient: string;
    dateOfServiceInpatient: number;
    reasonInpatient: string;
    interventionInpatient: string;
    responseInpatient: string;

    agencyInpatient1: string;
    dateOfServiceInpatient1: number;
    reasonInpatient1: string;
    interventionInpatient1: string;
    responseInpatient1: string;

    agencyInpatient2: string;
    dateOfServiceInpatient2: number;
    reasonInpatient2: string;
    interventionInpatient2: string;
    responseInpatient2: string;

    isNotByClient = false;
    isPerClient = false;
    isPerMedical = false;
    documentDiagnosis: string;

    isNoneReported = false;

    psychotropicMedications: string;
    perClientReport: string;
    psychotropicMedications1: string;
    perClientReport1: string;
    psychotropicMedications2: string;
    perClientReport2: string;
    psychotropicMedications3: string;
    perClientReport3: string;
    iscurrentMedication = false;
    currentMedication: string;
    prescribedBy: string;
    startDate: number;
    dosageFrequency: string;
    reason: string;
    isComplianceYes = false;
    isComplianceNo = false;

    currentMedication1: string;
    prescribedBy1: string;
    startDate1: number;
    dosageFrequency1: string;
    reason1: string;
    isComplianceYes1 = false;
    isComplianceNo1 = false;

    currentMedication2: string;
    prescribedBy2: string;
    startDate2: number;
    dosageFrequency2: string;
    reason2: string;
    isComplianceYes2 = false;
    isComplianceNo2 = false;

    currentMedication3: string;
    prescribedBy3: string;
    startDate3: number;
    dosageFrequenc3y: string;
    reason3: string;
    isComplianceYes3 = false;
    isComplianceNo3 = false;

    currentMedication4: string;
    prescribedBy4: string;
    startDate4: number;
    dosageFrequency4: string;
    reason4: string;
    isComplianceYes4 = false;
    isComplianceNo4 = false;

    dosageFrequency3: string;

    isAdverseReaction = false;
    isPerClientReport = false;
    isPerMedicalRecord = false;
    adverseReactions: string;

    isDangerNone = false;
    isDangerThreat = false;
    isDangerIntent = false;
    isDangerSuicidePrecaution = false;
    isDangerIdeation = false;
    isDangerRunaway = false;
    isDangerIntentWithout = false;
    isDangerPlan = false;
    isDangerSelfCare = false;
    isDangerGestures = false;
    isDangerRisk = false;

    dangerExplain: string;

    isHistoryNone = false;
    isHistoryThreat = false;
    isHistoryIntent = false;
    isHistorySuicidePrecaution = false;
    isHistoryIdeation = false;
    isHistoryRunaway = false;
    isHistoryIntentWithout = false;
    isHistoryPlan = false;
    isHistorySelfCare = false;
    isHistoryGestures = false;
    isHistoryRisk = false;

    historyExplain: string;

    isCurrentDangerNone = false;
    isCurrentDangerThreat = false;
    isCurrentDangerIntent = false;
    isCurrentDangerIdeation = false;
    isCurrentDangerRunaway = false;
    isCurrentDangerIntentWithout = false;
    isCurrentDangerPlan = false;
    isCurrentDangerSuicidePrecaution = false;
    isCurrentDangerRisk = false;

    currentDangerExplain: string;

    isHistoryOthersNone = false;
    isHistoryOthersThreat = false;
    isHistoryOthersIntent = false;
    isHistoryOthersIdeation = false;
    isHistoryOthersRunaway = false;
    isHistoryOthersIntentWithout = false;
    isHistoryOthersPlan = false;
    isHistoryOthersSuicidePrecaution = false;
    isHistoryOthersRisk = false;

    historyOthersExplain: string;

    isCurrentPropertyYes = false;
    isCurrentPropertyNo = false;
    explainCurrentPropertyIfYes: string;

    isHistoryPropertyYes = false;
    isHistoryPropertyNo = false;
    explainDestructionPropertyIfYes: string;

    isNoDisorder = false;
    isBorderline = false;
    isMild = false;
    isModerate = false;
    isPronounced = false;
    isSevere = false;
    isExtreme = false;

    isappearanceNormal = false;
    isContentThoughtNormal = false;
    isSensoriumNormal = false;

    sad: string;
    expressionless: string;
    hostileFacialExpression: string;
    worried: string;
    avoidsGaze: string;
    inappropriateGeneralAppearance: string;
    isPhysicalAbnormality = false;
    weightOver: string;
    weightUnder: string;
    heightTall: string;
    heightShort: string;
    blemishes: string;
    poor: string;
    disorganized: string;
    seductiveClothingHygiene: string;
    eccentric: string;
    isInterviewNormal = false;
    angryOutbursts: string;
    irritable: string;
    impulsive: string;
    hostileInterviewBehaviour: string;
    silly: string;
    sensitive: string;
    apathetic: string;
    withdrawn: string;
    evasive: string;
    passive: string;
    aggressive: string;
    naive: string;
    overlyDramatic: string;
    manipulative: string;
    dependent: string;
    uncooperative: string;
    demanding: string;
    denial: string;
    negativistic: string;
    callous: string;
    infantileInterviewBehaviour: string;
    seductiveInterviewBehaviour: string;
    isIntellectNormal = false;
    intellectAboveNormal: string;
    intellectBelowNormal: string;
    additionalComments: string;

    suicidalThoughts: string;
    suicidalPlans: string;
    suicideAttempts: string;
    assaultiveIdeas: string;
    homicidalIdeas: string;
    homicidalPlans: string;
    antisocialAttitude: string;
    suspiciousness: string;
    unsocialAttitude: string;
    familyConcerns: string;
    povertyOfContent: string;
    phobias: string;
    obsessions: string;
    compulsions: string;
    drugPreoccupation: string;
    feelingsOfUnreality: string;
    hallucinations: string;
    delusions: string;
    parents: string;
    teachers: string;
    peers: string;
    others: string;
    runningAway: string;
    somaticComplaints: string;
    guilt: string;
    hopelessness: string;
    worthlessness: string;
    religiosity: string;
    sexualPreoccupation: string;
    sexualProblems: string;
    isFlowThoughtNormal = false;
    blocking: string;
    circumstantial: string;
    tangential: string;
    confabulation: string;
    perseveration: string;
    flightOfIdeas: string;
    looseAssociation: string;
    indecisive: string;
    isMoodAffectNormal = false;
    anxious: string;
    inappropriateMoodAffect: string;
    flatAffect: string;
    elevatedMood: string;
    depression: string;
    labileMood: string;

    orientationImpairedtime: number;
    place: string;
    person: string;
    poorRecent: string;
    poorRemote: string;
    amnesia: string;
    troubleConcentrating: string;
    isSpeechNormal = false;
    excessiveAmount: string;
    reducedAmount: string;
    mute: string;
    pressureOfSpeech: string;
    slowed: string;
    loud: string;
    soft: string;
    slurred: string;
    articulationProblem: string;
    infantileSpeech: string;
    echolalia: string;
    neologisms: string;
    delayedDevT: string;
    isMotorActivityNormal = false;
    increasedAmount: string;
    decreasedAmount: string;
    agitation: string;
    tics: string;
    tremor: string;
    peculiarPosturing: string;
    repetitiveActs: string;
    poorGrMtrCood: string;
    poorFineMtrCood: string;
    dominance: string;
    isInsightNormal = false;
    poorInsight: string;
    poorJudgment: string;
    unrealisticRegarding: string;
    problems: string;
    doesnTUnderstand: string;
    whyHeSheIsThere: string;
    unmotivatedFor: string;
    treatment: string;

    hxOfRunningAway: string;
    peersProblems: string;
    parentsProblems: string;
    peachersProblems: string;
    siblingsProblems: string;
    othersProblems: string;
    disruptiveInSchool: string;
    withdrawnInSchool: string;
    poorSchoolAchieve: string;
    learningDisability: string;
    lying: string;
    stealing: string;
    aggression: string;
    irresponsible: string;
    promiscuous: string;
    sexualDeviation: string;
    oppositionalAttitude: string;
    homeProblems: string;
    schoolProblems: string;
    otherProblems: string;
    unrealisticFears: string;
    anxietyProblems: string;
    tantrums: string;
    enuresis: string;
    encopresis: string;
    moody: string;
    criesFrequently: string;
    isEnvironmentalStressors = false;
    isDivorceSeparation = false;
    isMaritalDiscord = false;
    isFamilyFinancialProblems = false;
    physicalIllness: string;
    physicalDisability: string;
    physicallyAbused: string;
    sexuallyAbused: string;
    physicalIllnessInFamilyMember: string;
    mentalIllnessInFamilyMember: string;

    code1: string;
    code2: string;
    dsmCode1: string;
    dsmCode2: string;

    code: string;
    dsmCode: string;

    code3: string;
    dsmCode3: string;

    code4: string;
    dsmCode4: string;

    code5: string;
    dsmCode5: string;

    code6: string;
    dsmCode6: string;

    code7: string;
    dsmCode7: string;

    dsmDescription: string;
    dsmGaf: string;
    diagnosticJustification: string;

    isNoShcn = false;
    isSpmi = false;
    isMentalIllness = false;
    isIdd = false;
    isPregnant = false;
    isIntravenousDrugs = false;
    isSed = false;
    isAgeYouth = false;
    isDurationAndDiagnosis = false;
    isFunctionalImpairment = false;
    isInattentiveInClass = false;
    isRiskHomePlacement = false;
    isCommunity = false;

    isCoordinationPcpYes = false;
    isCoordinationPcpNo = false;
    isDeclinedToReport = false;
    isCoordinationPcpNotApplicable = false;

    lastName: string;
    firstName: string;
    address: string;

    isInitialTreatmentSentYes = false;
    isInitialTreatmentSentNo = false;

    isUseProvidersYes = false;
    isUseProvidersNo = false;
    isUseProvidersDeclinedReport = false;
    isUseProvidersNotApplicable = false;

    isOtherTreatersyes = false;
    isOtherTreatersNo = false;
    isOtherTreatersDeclinedReport = false;
    isOtherTreatersNotApplicable = false;
    otherTreatersIfYesReason: string;
    isCourtOrderedYes = false;
    isCourtOrderedNo = false;
    courtOrderedIfYesReason: string;

    isCompleteRestYes = false;
    isRestOfTheProfileNo = false;
    isServicesFollowingNo = false;
    explainServicesFollowingIfYes: string;
    treatmentPlanFrom: string;
    treatmentPlanTo: string;

    barriersToTreatment: string;
    strengthsAssets: string;
    treatmentPreferences: string;
    dischargeCriteri: string;
    closeCase: string;

    goalI: string;

    goalIObj: string;
    goalIObjectives: string;
    goalIServiceModality: string;
    goalIFrequency: string;
    goalIDuration: string;
    goalIStartDate: number;
    goalITargetDate: number;
    goalIReviewScore: string;

    goalIObj1: string;
    goalIObjectives1: string;
    goalIServiceModality1: string;
    goalIFrequency1: string;
    goalIDuration1: string;
    goalIStartDate1: number;
    goalITargetDate1: number;
    goalIReviewScore1: string;

    goalIObj2: string;
    goalIObjectives2: string;
    goalIServiceModality2: string;
    goalIFrequency2: string;
    goalIDuration2: string;
    goalIStartDate2: number;
    goalITargetDate2: number;
    goalIReviewScore2: string;

    goalIObj3: string;
    goalIObjectives3: string;
    goalIServiceModality3: string;
    goalIFrequency3: string;
    goalIDuration3: string;
    goalIStartDate3: number;
    goalITargetDate3: number;
    goalIReviewScore3: string;

    goalIObj4: string;
    goalIObjectives4: string;
    goalIServiceModality4: string;
    goalIFrequency4: string;
    goalIDuration4: string;
    goalIStartDate4: number;
    goalITargetDate4: number;
    goalIReviewScore4: string;



    goalIi: string;

    goalIiObj: string;
    goalIiObjectives: string;
    goalIiServiceModality: string;
    goalIiFrequency: string;
    goalIiDuration: string;
    goalIiStartDate: number;
    goalIiTargetDate: number;
    goalIiReviewScore: string;

    goalIiObj1: string;
    goalIiObjectives1: string;
    goalIiServiceModality1: string;
    goalIiFrequency1: string;
    goalIiDuration1: string;
    goalIiStartDate1: number;
    goalIiTargetDate1: number;
    goalIiReviewScore1: string;

    goalIiObj2: string;
    goalIiObjectives2: string;
    goalIiServiceModality2: string;
    goalIiFrequency2: string;
    goalIiDuration2: string;
    goalIiStartDate2: number;
    goalIiTargetDate2: number;
    goalIiReviewScore2: string;

    goalIiObj3: string;
    goalIiObjectives3: string;
    goalIiServiceModality3: string;
    goalIiFrequency3: string;
    goalIiDuration3: string;
    goalIiStartDate3: number;
    goalIiTargetDate3: number;
    goalIiReviewScore3: string;

    goalIiObj4: string;
    goalIiObjectives4: string;
    goalIiServiceModality4: string;
    goalIiFrequency4: string;
    goalIiDuration4: string;
    goalIiStartDate4: number;
    goalIiTargetDate4: number;
    goalIiReviewScore4: string;

    longGoal: string;
    longGoalObj: string;
    longGoalObjectives: string;
    longGoalServiceModality: string;
    longGoalFrequency: string;
    longGoalDuration: string;
    longGoalStartDate: number;
    longGoalTargetDate: number;
    longGoalReviewScore: string;

    longGoalObj1: string;
    longGoalObjectives1: string;
    longGoalServiceModality1: string;
    longGoalFrequency1: string;
    longGoalDuration1: string;
    longGoalStartDate1: number;
    longGoalTargetDate1: number;
    longGoalReviewScore1: string;

    longGoalObj2: string;
    longGoalObjectives2: string;
    longGoalServiceModality2: string;
    longGoalFrequency2: string;
    longGoalDuration2: string;
    longGoalStartDate2: number;
    longGoalTargetDate2: number;
    longGoalReviewScore2: string;

    longGoalObj3: string;
    longGoalObjectives3: string;
    longGoalServiceModality3: string;
    longGoalFrequency3: string;
    longGoalDuration3: string;
    longGoalStartDate3: number;
    longGoalTargetDate3: number;
    longGoalReviewScore3: string;

    longGoalObj4: string;
    longGoalObjectives4: string;
    longGoalServiceModality4: string;
    longGoalFrequency4: string;
    longGoalDuration4: string;
    longGoalStartDate4: number;
    longGoalTargetDate4: number;
    longGoalReviewScore4: string;

    isPrognosisGood = false;
    isPrognosisFair = false;
    isPrognosisGuarded = false;

    justification: string;

    planSignatureConsumer: string;
    planSignatureParent: string;
    planSignatureTherapist: string;
    consumerDate: number;
    parentDate: number;
    therapistDate: number;

    participantSignatures1: string;
    participantSignatures2: string;
    participantSignatures3: string;
    participantSignatures4: string;

}
