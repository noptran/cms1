export class FpProgressNote {
    caseName: string;
    caseNumber: number;
    dateOfReferral: any;
    date: any;
    startTime: number;
    endTime: number;
    duration: number;
    serviceProvider: string;

    officeLocation: string;
    clientLocation: string;

    isIndividualTherapy = false;
    isFamilyTherapy = false;

    originatingSite: string;
    distantSite: string;

    isGroupTherapy = false;
    isFamilyTherapyInClinic = false;
    isInitialPsych = false;
    isCaseConference = false;

    diagnosis: string;
    participant: string;
    aloneTimeWithChild: string;
    childExceptions: string;
    objectivesAddressed: string;

    communityResources: string;
    clientFunctioning: string;
    collaborativeChanges: string;
    changesInDiagnosis: string;

    isGood = false;
    isFair = false;
    isGuarded = false;
    isPoorGaf = false;

    poorGaf: string;

    treatmentNeeded: string;
    moodDisorder: string;
    continuedImpairment: string;
    interpersonal: string;
    impairmentInSocial: string;
    careCriteria: string;
    servicesNecessary: string;
    continuedNeed: string;

    isSevere = false;
    isEuthymic = false;
    isNoImpairment = false;
    isBlunted = false;
    isNone = false;
    isModerate = false;
    isDepressed = false;
    isDisorganized = false;
    isRestricted = false;
    isIdeation = false;
    isMild = false;
    isIrritable = false;
    isPoorConcentration = false;
    isIntense = false;
    isPlan = false;
    isMinimal = false;
    isAnxious = false;
    isImpairedAbstract = false;
    isAppropriate = false;
    isGestures = false;
    isImpairmentNone = false;
    isEuphoric = false;
    isImpairedJudgment = false;
    isFlat = false;
    isOngoingConcern = false;
    isImpairmentOther = false;

    impairmentOther: string;

    isDetached = false;
    /////////////////////////////////

    isSafetyConcernsYes = false;
    isSafetyConcernsNo = false;
    isSafetyConcernsNa = false;

    isHomeCleanYes = false;
    isHomeCleanNo = false;
    isHomeCleanNa = false;

    isHeightNormalYes = false;
    isHeightNormalNo = false;
    isHeightNormalNa = false;

    isChildCleanYes = false;
    isChildCleanNo = false;
    isChildCleanNa = false;

    isUnusualMarksYes = false;
    isUnusualMarksNo = false;
    isUnusualMarksNa = false;

    isChildAppearanceYes = false;
    isChildAppearanceNo = false;
    isChildAppearanceNa = false;

    nextAppointment: string;
    planForClient: string;

    therapistName: string;
    therapistSignature: string;
    therapistDate: number;

    isCertified = false;


}
