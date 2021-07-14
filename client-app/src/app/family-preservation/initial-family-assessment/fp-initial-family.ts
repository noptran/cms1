export class FpInitialFamily {
    caseName: string;
    caseNumber: number;
    dateOfReferral: any;
    date: any;
    contact24Date: number;
    contact24Time: number;
    contact24Location: string;
    contact24Worker: string;
    contact48Date: number;
    contact48Time: number;
    contact48Location: string;
    contactWorker: string;
    presentDuringMeeting: string;
    isAnnualIncome = false;
    annualIncome: string;
    numberLiving: string;
    isSingleParent = false;
    isInformedConsent = false;
    isEmergencyPhone = false;
    isFullDisclosure = false;
    isAloneTimeRequirement = false;
    isFamiliesAreProvided = false;
    familyReasonReferral: string;
    strengths: string;
    isConcernsSfcs = false;
    concernsAboutSfcs: string;
    isConcernsYes = false;
    isConcernsNo = false;
    concernsAboutSfcs1: string;
    isConcernsYes1 = false;
    isConcernsNo1 = false;
    concernsAboutSfcs2: string;
    isConcernsYes2 = false;
    isConcernsNo2 = false;

    isBenefitsFatherInvolvement = false;
    isNotifiedOnHearing = false;
    notifiedHearingDate: number;
    isCasePlanningConference = false;
    isAppointmentMet = false;
    appointmentMetDate: number;

    listOfParentsOne: string;
    listOfParentsTwo: string;
    listOfParentsThree: string;
    addressParent: string;
    phoneParent: string;
    addressParent1: string;
    phoneParent1: string;
    addressParent2: string;
    phoneParent2: string;

    isInformationVerified = false;
    isFamilyMembersVerified = false;
    isInsuranceVerified = false;
    isReleasesExplained = false;
    isMilitaryAssessed = false;
    assessedMilitary: string;
    reasonForContactNotMade: string;
    continuousAssessmentsPr: string;
    safetyPlanPr: string;
    caseManagementPr: string;
    therapyPr: string;
    continuousAssessmentsTd: string;
    safetyPlanTd: string;
    caseManagementTd: string;
    therapyTd: string;
    caseManagementPlan: string;
    therapyPlan: string;
    isSafetyCreatedYes = false;
    isSafetyCreatedNo = false;
    dcfSocialWorker: string;
    therapist: string;
    signatureDate: number;

    signaturesOne: string;
    relationshipOne: string;
    signaturesTwo: string;
    relationshipTwo: string;
    careGiver1Name: string;
    careGiver1Date: number;
    careGiver1Occupation: string;
    careGiver1Address: string;
    careGiver1SsNo: number;
    careGiver1Ethnicity: string;
    careGiver1PrimaryLanguage: string;
    careGiver1Employer: string;
    careGiver1WorkPhone: number;
    careGiver1HomePhone: number;
    careGiver1CellPhone: number;
    isCareGiver1UsCitizenYes = false;
    isCareGiver1UsCitizenNo = false;
    careGiver1ReasonIfNoUs: string;

    careGiver2Name: string;
    careGiver2Date: number;
    careGiver2Occupation: string;
    careGiver2Address: string;
    careGiver2SsNo: number;
    careGiver2Ethnicity: string;
    careGiver2PrimaryLanguage: string;
    careGiver2Employer: string;
    careGiver2WorkPhone: number;
    careGiver2HomePhone: number;
    careGiver2CellPhone: number;
    isCareGiver2UsCitizenYes = false;
    isCareGiver2UsCitizenNo = false;
    careGiver2ReasonIfNoUs: string;

    ncp1Name: string;
    ncp1Date: number;
    ncp1Occupation: string;
    ncp1Address: string;
    ncp1SsNo: number;
    ncp1MilitaryStatus: string;
    ncp1Ethnicity: string;
    ncp1PrimaryLanguage: string;
    ncp1Employer: string;
    ncp1WorkPhone: number;
    ncp1HomePhone: number;
    ncp1CellPhone: number;
    isNcp1UsCitizenYes = false;
    isNcp1UsCitizenNo = false;
    ncp1ReasonIfNoUs: string;
    isNcp1PaternityYes = false;
    isNcp1PaternityNo = false;
    isNcp1PaternityNa = false;
    ncp1EffortsIfNo: string;
    isNcp1LocationYes = false;
    isNcp1LocationNo = false;
    isNcp1SupportContactedYes = false;
    isNcp1SupportContactedNo = false;
    isNcp1SameArea = false;
    isNcp1OutCountry = false;
    isNcp1Deceased = false;
    ncp1DeceasedDate: number;
    isNcp1OutState = false;
    isNcp1Jail = false;
    ncp1VisitationArrangement: string;
    isNcp1NotWantContact = false;
    ncp1ReasonNotContact: string;
    isNcp1AllegedYes = false;
    isNcp1AllegedNo = false;
    ncp1AllegedYesReason: string;
    isNcp1AlcoholAbuseYes = false;
    isNcp1AlcoholAbuseNo = false;
    ncp1AlcoholAbuseYesReason: string;
    isNcp1CriminalYes = false;
    isNcp1CriminalNo = false;
    ncp1CriminalYesReason: string;

    ncp2Name: string;
    ncp2Date: number;
    ncp2Occupation: string;
    ncp2Address: string;
    ncp2SsNo: number;
    ncp2MilitaryStatus: string;
    ncp2Ethnicity: string;
    ncp2PrimaryLanguage: string;
    ncp2Employer: string;
    ncp2WorkPhone: number;
    ncp2HomePhone: number;
    ncp2CellPhone: number;
    isNcp2UsCitizenYes = false;
    isNcp2UsCitizenNo = false;
    ncp2ReasonIfNoUs: string;
    isNcp2PaternityYes = false;
    isNcp2PaternityNo = false;
    isNcp2PaternityNa = false;
    isNcp2EffortsIfNo = false;
    isNcp2LocationYes = false;
    isNcp2LocationNo = false;
    isNcp2SupportContactedYes = false;
    isNcp2SupportContactedNo = false;
    isNcp2SameArea = false;
    isNcp2OutCountry = false;
    isNcp2Deceased = false;
    ncp2DeceasedDate: number;
    isNcp2OutState = false;
    isNcp2Jail = false;
    ncp2VisitationArrangement: string;
    isNcp2NotWantContact = false;
    ncp2ReasonNotContact: string;
    isNcp2AllegedYes = false;
    isNcp2AllegedNo = false;
    ncp2AllegedYesReason: string;
    isNcp2AlcoholAbuseYes = false;
    isNcp2AlcoholAbuseNo = false;
    ncp2AlcoholAbuseYesReason: number;
    isNcp2CriminalYes = false;
    isNcp2CriminalNo = false;
    ncp2CriminalYesReason: string;

    cIH1Name: string;
    cIH1Dob: number;
    cIH1Age: number;
    cIH1Ssn: number;
    cIH1Sex: string;
    cIH1Race: string;
    cIH1Ethnicity: string;
    cIH1PrimaryLanguage: string;
    cIH1SchoolAttends: string;
    isCIH1MosCompletedYes = false;
    isCIH1MosCompletedNo = false;

    cIH2Name: string;
    cIH2Dob: number;
    cIH2Age: number;
    cIH2Ssn: number;
    cIH2Sex: string;
    cIH2Race: string;
    cIH2Ethnicity: string;
    cIH2PrimaryLanguage: string;
    cIH2SchoolAttends: string;
    isCIH2MosCompletedYes = false;
    isCIH2MosCompletedNo = false;

    cIH3Name: string;
    cIH3Dob: number;
    cIH3Age: number;
    cIH3Ssn: number;
    cIH3Sex: string;
    cIH3Race: string;
    cIH3Ethnicity: string;
    cIH3PrimaryLanguage: string;
    cIH3SchoolAttends: string;
    isCIH3MosCompletedYes = false;
    isCIH3MosCompletedNo = false;

    cIH4Name: string;
    cIH4Dob: number;
    cIH4Age: number;
    cIH4Ssn: number;
    cIH4Sex: string;
    cIH4Race: string;
    cIH4Ethnicity: string;
    cIH4PrimaryLanguage: string;
    cIH4SchoolAttends: string;
    isCIH4MosCompletedYes = false;
    isCIH4MosCompletedNo = false;
    otherSiblingsName1: string;
    otherSiblingsDob1: number;
    otherSiblingsReside1: string;
    otherSiblingsName2: string;
    otherSiblingsDob2: number;
    otherSiblingsReside2: string;
    otherSiblingsName3: string;
    otherSiblingsDob3: number;
    otherSiblingsReside3: string;

    otherSiblingsName: string;
    otherSiblingsDob: number;
    otherSiblingsReside: string;

    dcfWorkerName: string;
    dcfWorkerPhone: number;
    dcfWorkerFax: string;
    dcfWorkerAddress: string;
    kinshipChildName: string;
    kinshipKinName: string;
    kinshipRelationship: string;
    kinshipAddress: string;
    kinshipPhone: number;
    isKinshipReleaseYes = false;
    isKinshipReleaseNo = false;
    isKinshipInviteYes = false;
    isKinshipInviteNo = false;

    kinshipChildName1: string;
    kinshipKinName1: string;
    kinshipRelationship1: string;
    kinshipAddress1: string;
    kinshipPhone1: number;
    isKinshipReleaseYes1 = false;
    isKinshipReleaseNo1 = false;
    isKinshipInviteYes1 = false;
    isKinshipInviteNo1 = false;

    kinshipChildName2: string;
    kinshipKinName2: string;
    kinshipRelationship2: string;
    kinshipAddress2: string;
    kinshipPhone2: number;
    isKinshipReleaseYes2 = false;
    isKinshipReleaseNo2 = false;
    isKinshipInviteYes2 = false;
    isKinshipInviteNo2 = false;

    kinshipChildName3: string;
    kinshipKinName3: string;
    kinshipRelationship3: string;
    kinshipAddress3: string;
    kinshipPhone3: number;
    isKinshipReleaseYes3 = false;
    isKinshipReleaseNo3 = false;
    isKinshipInviteYes3 = false;
    isKinshipInviteNo3 = false;

    kinshipChildName4: string;
    kinshipKinName4: string;
    kinshipRelationship4: string;
    kinshipAddress4: string;
    kinshipPhone4: number;
    isKinshipReleaseYes4 = false;
    isKinshipReleaseNo4 = false;
    isKinshipInviteYes4 = false;
    isKinshipInviteNo4 = false;

    kinshipChildName5: string;
    kinshipKinName5: string;
    kinshipRelationship5: string;
    kinshipAddress5: string;
    kinshipPhone5: number;
    isKinshipReleaseYes5 = false;
    isKinshipReleaseNo5 = false;
    isKinshipInviteYes5 = false;
    isKinshipInviteNo5 = false;


    genogram: string;

    socialWelfare: string;
    healthCare: string;
    cultureReligion: string;
    extendedFamily: string;



    extendedFamily2: string;

    work: string;
    recreation: string;

    school: string;
    friends: string;
    recreation2: string;



    familyOrHousehold: string;

    isNutritionChildrenScreenedNone = false;
    isNutritionChildrenScreenedListed = false;
    nutritionChildName1: string;
    nutritionItem1: string;
    nutritionNotes1: string;
    nutritionChildName2: string;
    nutritionItem2: string;
    nutritionNotes2: string;

    nutritionChildName3: string;
    nutritionItem3: string;
    nutritionNotes3: string;

    nutritionChildName: string;
    nutritionItem: string;
    nutritionNotes: string;

    nutritionChildName4: string;
    nutritionItem4: string;
    nutritionNotes4: string;

    isPainScreenedNone = false;
    isPainScreenedListed = false;
    painChild1: string;
    painScreenPain1: string;
    painNotes1: string;
    painChild2: string;
    painScreenPain2: string;
    painNotes2: string;

    painChild4: string;
    painScreenPain4: string;
    painNotes4: string;

    painChild3: string;
    painScreenPain3: string;
    painNotes3: string;

    painChild: string;
    painScreenPain: string;
    painNotes: string;

    childAssessmentChild1: string;
    childAssessmentDate1: number;
    isImmunizationsYes1 = false;
    isImmunizationsNo1 = false;
    childAssessmentNotes1: string;
    childAssessmentChild2: string;
    childAssessmentDate2: number;
    isImmunizationsYes2 = false;
    isImmunizationsNo2 = false;
    childAssessmentNotes2: string;

    childAssessmentChild: string;
    childAssessmentDate: number;
    isImmunizationsYes = false;
    isImmunizationsNo = false;
    childAssessmentNotes: string;

    childAssessmentChild3: string;
    childAssessmentDate3: number;
    isImmunizationsYes3 = false;
    isImmunizationsNo3 = false;
    childAssessmentNotes3: string;


    childAssessmentChild4: string;
    childAssessmentDate4: number;
    isImmunizationsYes4 = false;
    isImmunizationsNo4 = false;
    childAssessmentNotes4: string;

    childAssessmentChild5: string;
    childAssessmentDate5: number;
    isImmunizationsYes5 = false;
    isImmunizationsNo5 = false;
    childAssessmentNotes5: string;

    childAssessmentChild6: string;
    childAssessmentDate6: number;
    isImmunizationsYes6 = false;
    isImmunizationsNo6 = false;
    childAssessmentNotes6: string;

    childAssessmentChild7: string;
    childAssessmentDate7: number;
    isImmunizationsYes7 = false;
    isImmunizationsNo7 = false;
    childAssessmentNotes7: string;

    childAssessmentChild8: string;
    childAssessmentDate8: number;
    isImmunizationsYes8 = false;
    isImmunizationsNo8 = false;
    childAssessmentNotes8: string;

    childAssessmentChild9: string;
    childAssessmentDate9: number;
    isImmunizationsYes9 = false;
    isImmunizationsNo9 = false;
    childAssessmentNotes9: string;



    isWelfareChildrenScreenedNone = false;
    isWelfareChildrenScreenedListed = false;
    welfareChildName1: string;
    welfareItem1: string;
    welfareNotes1: string;
    welfareChildName2: string;
    welfareItem2: string;
    welfareNotes2: string;

    welfareChildName3: string;
    welfareItem3: string;
    welfareNotes3: string;

    welfareChildName: string;
    welfareItem: string;
    welfareNotes: string;

    isMental5YrsChildrenScreenedNone = false;
    isMental5YrsChildrenScreenedListed = false;
    mental5YrsChildName1: string;
    mental5YrsItem1: string;
    mental5YrsNotes1: string;
    mental5YrsChildName2: string;
    mental5YrsItem2: string;
    mental5YrsNotes2: string;

    mental5YrsChildName: string;
    mental5YrsItem: string;
    mental5YrsNotes: string;

    mental5YrsChildName3: string;
    mental5YrsItem3: string;
    mental5YrsNotes3: string;

    isMental6YrsChildrenScreenedNone = false;
    isMental6YrsChildrenScreenedListed = false;
    mental6YrsChildName1: string;
    mental6YrsItem1: string;
    mental6YrsNotes1: string;
    mental6YrsChildName2: string;
    mental6YrsItem2: string;
    mental6YrsNotes2: string;
    staffSignatureMentalHealth: string;
    dateMentalHealth: number;

    clientName: string;
    clientName1: string;
    clientName2: string;

    clientAge: string;
    clientAge1: string;
    clientAge2: string;

    personName: string;
    personName1: string;
    personName2: string;


    moreDrinking2: string;
    moreDrinking1: string;
    moreDrinking: string;
    alcohols2: string;
    alcohols1: string;
    alcohols: string;
    drug2: string;
    drug1: string;
    drug: string;
    alcoholDrug2: string;
    alcoholDrug1: string;
    alcoholDrug: string;
    preOccupied2: string;
    preOccupied1: string;
    preOccupied: string;
    emotionalDiscomfort2: string;
    emotionalDiscomfort1: string;
    emotionalDiscomfort: string;
    referralNeeded2: string;
    referralNeeded1: string;
    referralNeeded: string;
    referralMade: string;
    referralMade2: string;
    referralMade1: string;
    dateReferral: string;
    dateReferral1: string;
    dateReferral2: string;

    staffSignatureUncope: string;
    dateUncope: number;

    suicideRiskCaseName: string;
    suicideRiskCaseNumber: number;
    suicideRiskReferralDate: any;
    suicideRiskDate: any;

    suicideRiskAssessmentName: string;
    isSuicideRiskNoActionYes = false;
    isSuicideRiskNoActionNo = false;
    isDangerSelfClear = false;
    isDangerSelfPotentially = false;
    isDangerSelfAttempts = false;
    isDangerSelfHopelessness = false;
    isDangerSelfSubstance = false;
    isDangerSelfLoss = false;
    isDangerSelfIdeation = false;
    isDangerSelfHarm = false;
    isDangerSelfChronic = false;
    isDangerSelfNone = false;
    isDangerOthersClear = false;
    isDangerOthersPlan = false;
    isDangerOthersAttempts = false;
    isDangerOthersSubstance = false;
    isDangerOthersIdeation = false;
    isDangerOthersNone = false;
    isProtectiveNone = false;
    isProtectiveFamily = false;
    isProtectiveCommunity = false;
    isProtectiveReligious = false;
    isProtectiveTolerance = false;
    isProtectivePositive = false;
    isProtectiveCopeStress = false;
    isProtectiveCompliant = false;
    isProtectiveIntelligence = false;
    isProtectiveSafety = false;
    isRiskHigh = false;
    isRiskModerate = false;
    isRiskMild = false;
    isRiskLow = false;

    isSuicideRiskNoActionYes1 = false;
    isSuicideRiskNoActionNo1 = false;
    isDangerSelfClear1 = false;
    isDangerSelfPotentially1 = false;
    isDangerSelfAttempts1 = false;
    isDangerSelfHopelessness1 = false;
    isDangerSelfSubstance1 = false;
    isDangerSelfLoss1 = false;
    isDangerSelfIdeation1 = false;
    isDangerSelfHarm1 = false;
    isDangerSelfChronic1 = false;
    isDangerSelfNone1 = false;
    isDangerOthersClear1 = false;
    isDangerOthersPlan1 = false;
    isDangerOthersAttempts1 = false;
    isDangerOthersSubstance1 = false;
    isDangerOthersIdeation1 = false;
    isDangerOthersNone1 = false;
    isProtectiveNone1 = false;
    isProtectiveFamily1 = false;
    isProtectiveCommunity1 = false;
    isProtectiveReligious1 = false;
    isProtectiveTolerance1 = false;
    isProtectivePositive1 = false;
    isProtectiveCopeStress1 = false;
    isProtectiveCompliant1 = false;
    isProtectiveIntelligence1 = false;
    isProtectiveSafety1 = false;
    isRiskHigh1 = false;
    isRiskModerate1 = false;
    isRiskMild1 = false;
    isRiskLow1 = false;

    isSuicideRiskNoActionYes2 = false;
    isSuicideRiskNoActionNo2 = false;
    isDangerSelfClear2 = false;
    isDangerSelfPotentially2 = false;
    isDangerSelfAttempts2 = false;
    isDangerSelfHopelessness2 = false;
    isDangerSelfSubstance2 = false;
    isDangerSelfLoss2 = false;
    isDangerSelfIdeation2 = false;
    isDangerSelfHarm2 = false;
    isDangerSelfChronic2 = false;
    isDangerSelfNone2 = false;
    isDangerOthersClear2 = false;
    isDangerOthersPlan2 = false;
    isDangerOthersAttempts2 = false;
    isDangerOthersSubstance2 = false;
    isDangerOthersIdeation2 = false;
    isDangerOthersNone2 = false;
    isProtectiveNone2 = false;
    isProtectiveFamily2 = false;
    isProtectiveCommunity2 = false;
    isProtectiveReligious2 = false;
    isProtectiveTolerance2 = false;
    isProtectivePositive2 = false;
    isProtectiveCopeStress2 = false;
    isProtectiveCompliant2 = false;
    isProtectiveIntelligence2 = false;
    isProtectiveSafety2 = false;
    isRiskHigh2 = false;
    isRiskModerate2 = false;
    isRiskMild2 = false;
    isRiskLow2 = false;

    isSuicideRiskNoActionYes3 = false;
    isSuicideRiskNoActionNo3 = false;
    isDangerSelfClear3 = false;
    isDangerSelfPotentially3 = false;
    isDangerSelfAttempts3 = false;
    isDangerSelfHopelessness3 = false;
    isDangerSelfSubstance3 = false;
    isDangerSelfLoss3 = false;
    isDangerSelfIdeation3 = false;
    isDangerSelfHarm3 = false;
    isDangerSelfChronic3 = false;
    isDangerSelfNone3 = false;
    isDangerOthersClear3 = false;
    isDangerOthersPlan3 = false;
    isDangerOthersAttempts3 = false;
    isDangerOthersSubstance3 = false;
    isDangerOthersIdeation3 = false;
    isDangerOthersNone3 = false;
    isProtectiveNone3 = false;
    isProtectiveFamily3 = false;
    isProtectiveCommunity3 = false;
    isProtectiveReligious3 = false;
    isProtectiveTolerance3 = false;
    isProtectivePositive3 = false;
    isProtectiveCopeStress3 = false;
    isProtectiveCompliant3 = false;
    isProtectiveIntelligence3 = false;
    isProtectiveSafety3 = false;
    isRiskHigh3 = false;
    isRiskModerate3 = false;
    isRiskMild3 = false;
    isRiskLow3 = false;

    isSuicideRiskNoActionYes4 = false;
    isSuicideRiskNoActionNo4 = false;
    isDangerSelfClear4 = false;
    isDangerSelfPotentially4 = false;
    isDangerSelfAttempts4 = false;
    isDangerSelfHopelessness4 = false;
    isDangerSelfSubstance4 = false;
    isDangerSelfLoss4 = false;
    isDangerSelfIdeation4 = false;
    isDangerSelfHarm4 = false;
    isDangerSelfChronic4 = false;
    isDangerSelfNone4 = false;
    isDangerOthersClear4 = false;
    isDangerOthersPlan4 = false;
    isDangerOthersAttempts4 = false;
    isDangerOthersSubstance4 = false;
    isDangerOthersIdeation4 = false;
    isDangerOthersNone4 = false;
    isProtectiveNone4 = false;
    isProtectiveFamily4 = false;
    isProtectiveCommunity4 = false;
    isProtectiveReligious4 = false;
    isProtectiveTolerance4 = false;
    isProtectivePositive4 = false;
    isProtectiveCopeStress4 = false;
    isProtectiveCompliant4 = false;
    isProtectiveIntelligence4 = false;
    isProtectiveSafety4 = false;
    isRiskHigh4 = false;
    isRiskModerate4 = false;
    isRiskMild4 = false;
    isRiskLow4 = false;

    staffSignatureSuicideRisk: string;
    dateSuicideRisk: number;
    suicidesafetyClientName: string;
    suicidesafetyRecNo: number;
    suicidesafetyDOB: any;
    suicidesafetyAssmntDate: number;

    suicideSafetyPlan: string;
    isSuicideSafetyMildRisk = false;
    isSuicideSafetyModerateRisk = false;
    isSuicideSafetyHighRisk = false;
    suicideStaffMember: string;
    staffSignatureSuicidePrecaution: string;
    suicideRiskAssessmentCompleted: string;
    suicideReleaseOfInformation: string;
    lowModerateRisk: string;
    highRisk: string;
    suicideRiskTherapist: string;

    indicatorsDemonstratingSafety1: string;
    indicatorsDemonstratingSafety2: string;
    indicatorsDemonstratingSafety3: string;
    indicatorsDemonstratingSafety4: string;

    suicideInterventionClientSignature: string;
    suicideInterventionClientDate: number;
    suicideInterventionParentSignature: string;
    suicideInterventionParentDate: number;
    ceasingPrecaution: string;
    conductedRescreen: string;
    conductedRescreenDate: number;
    suicideRiskLpSignature: string;
    suicideRiskClientSignature: string;
    mental6YrsChildName: any;
    mental6YrsItem: any;
    mental6YrsNotes: any;
    mental6YrsChildName3: any;
    mental6YrsItem3: any;
    mental6YrsNotes3: any;
    suicideRiskAssessmentName1: any;
    suicideRiskAssessmentName2: any;
    suicideRiskAssessmentName3: any;
    suicideRiskAssessmentName4: any;

}
