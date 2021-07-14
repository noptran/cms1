export class Eeispf {
    ReferralID: number;
    ClientID: number;
    AuthorizedBy: string;
    PlacementCurrent_ProviderID: number;
    PlacementCurrent_ProviderLocationID: number;
    SchoolEnrolled_SchoolID: number;
    SchoolEnrolled_USDName: string;
    otherExp: any;
    SchoolEnrolled_EnrollmentDate: string;
    SchoolEnrolled_ClientSchoolID: number;
    SchoolEnrolled_OriginalGrade: string;
    SchoolEnrolled_Grade: string;
    placementAlternative: any;
    SchoolEnrolled_OriginalGradeID?: any;
    SchoolEnrolled_GradeID?: any;
    SchoolRecent1_NA: boolean;
    SchoolRecent1_SchoolID?: any;
    SchoolRecent1_ClientSchoolID?: any;
    SchoolRecent1_DatesAttended: string;
    SchoolRecent1_Placement_ProviderID?: any;
    SchoolRecent1_Placement_ProviderLocationID?: any;
    SchoolRecent1_Placement_PlacementDates: string;
    SchoolRecent2_NA: boolean;
    SchoolRecent2_SchoolID?: any;
    SchoolRecent2_DatesAttended: string;
    SchoolRecent2_Placement_ProviderID?: any;
    SchoolRecent2_Placement_ProviderLocationID?: any;
    SchoolRecent2_Placement_PlacementDates: string;
    IsIEPExists: boolean;
    IEP_ScannedDocumentID?: any;
    IEP_FileName?: any;
    schoolOriginDatesAttendedTo: any;
    schoolOriginDatesAttendedFrom: any;
    Is504PlanExists: boolean;
    Plan504_ScannedDocumentID?: any;
    Plan504_FileName?: any;
    ClientMedication?: any;
    Mother_FamilyMemberID?: any;
    Father_FamilyMemberID?: any;
    EducationalAdvocate_NA: boolean;
    EducationalAdvocate_CaseTeamID?: any;
    CaseManager_CaseTeamID?: any;
    FamilySupportWorker_CaseTeamID?: any;
    Supervisor_CaseTeamID?: any;
    DCFLiaison_CaseTeamID?: any;
    ComplianceTech_Email: string;
    DCFFosterCareAdministrator_FullName?: any;
    DCFFosterCareAdministrator_FullAddress?: any;
    DCFFosterCareAdministrator_CellPhone?: any;
    DCFFosterCareAdministrator_WorkPhoneWithExtension?: any;
    DCFFosterCareAdministrator_Email?: any;
    DCFFosterCareAdministrator_Fax?: any;
    EnteredBy: string;
    EnteredDate: number;
    ChangedBy?: any;
    ChangedDate?: any;
    client: any;
    provider: any;
    providerLocation: any;
    school: any;
    date: any;
    dateStaffed: any;
    schoolBuildEmail: any;
    schoolbuildName: any;
    school2BuildEmail: any;
    school2buildName: any;
    school3BuildEmail: any;
    school3buildName: any;
    isCwcbip = false;
    pre_schoolOriginDatesAttendedFrom: any;
    pre_schoolOriginDatesAttendedTo: any;
    isDCF = true;
    isSFM = true;
    isTFI = false;
    isKVC = false;
    isCustomerCare = false;
    islea = false;
    attendees: string;
    isLengthOfTime = false;
    isChildPreference = false;
    isLearningBehaviors = false;
    isParentPreference = false;
    isSafteyFactors = false;
    isChildAttachment = false;
    isParticipation = false;
    isPlacementOfSiblings = false;
    other = false;
    isDistanceFormSchool = false;
    isInfluenceOfSchoolClimate = false;
    isIFPAnd504 = false;
    isAvailability = false;
    isWrittenInput = false;
    decisionSummary: string;
    responsibelStateAgency: string;
    isDCF1 = false;
    isKDOCJS = false;
    authorizedBy: string;
    studentName: string;
    dob: any;
    ssn: string;
    isPhone = false;
    phone: string;
    isemail = false;
    email: string;
    placementNames: any;
    placementAddress: string;
    placementTelephoneNumbers: string;
    placementEmailAddress: string;
    usdName: string;
    usdNumber: string;
    schoolName: any;
    schoolAddress: string;
    schoolPhone: string;
    schoolMailORFax: string;
    essa: string;
    phoneNoOREmail: string;
    enrollmentDate: any;
    grade: any;
    regularEducation: string;
    isSpecialEducation = false;
    alternativeSchool: string;
    onlineLearning: string;
    isSchoolOfOriginName = false;
    schoolOriginName: any;
    schoolOriginAddress: string;
    schoolOriginPhone: string;
    schoolOriginESSA: string;
    schoolOriginPhoneOREmail: string;
    schoolOriginDatesAttended: any;
    isSchoolOrigin = false;
    isSpecialEducation1 = false;
    isSchoolOriginAlternativeSchool = false;
    isSchoolOrginOnlineLearning = false;
    placementName: any;
    datesOfPlacement: any;
    placementAddress1: string;
    placementPhone: string;
    placementEmail: string;
    placementAlternate: string;
    isPreviousSchoolName = false;
    previousSchoolName: any;
    previousSchoolAddress: string;
    previousSchoolFaxOrEmail: string;
    previousSchoolFax: string;
    previousSchoolEmail: string;
    previousSchoolESSA: string;
    previousSchoolDatesAttended: any;
    isPreviousSchoolRegularEducation = false;
    isPreviousSchoolSpecialEducation = false;
    isPreviousSchoolAlternativeSchool = false;
    isPreviousSchoolOnlineLearning = false;
    educationPlacementName: any;
    educationPlacementDates: any;
    educationPlacementAddress: string;
    edcautionPlacementPhone: string;
    educationEmail: string;
    educationAlternativeContact: string;
    isIEPYES = false;
    isIEPNO = false;
    isEvaluationInProgress = false;
    isIEPUnkown = false;
    isIEP504YES = false;
    isIEP504NO = false;
    isIEPUnkown1 = false;
    isIEPschoolYES = false;
    isIEPschoolNo = false;
    isIEPschoolUnknown = false;
    isIEPsuspendYES = false;
    isIEPsuspendNo = false;
    suspendedDate: any;
    suspendedLength: string;
    isStudentExpelledYes = false;
    isStudentExpelledNo = false;
    studentExpelledDate: any;
    studentExpelledLength: string;
    explainIfYes: string;
    safetyPrecautions: string;
    homeCareReasons: string;
    currentMedications: string;
    healthConditions: string;
    otherInformation: string;
    motherName: string;
    addressParent: string;
    phoneNoParent: any;
    emailParent: string;
    contactParent: string;
    isRestrictionContactedYes = false;
    isRestrictionContactedNo = false;
    isRightsTerminatedYes = false;
    isRightsTerminatedNo = false;
    additionalDetails: string;
    fatherName: string;
    fatherAddress: string;
    fatherPhoneNumber: string;
    fatherEmail: string;
    alternateFatherContact: string;
    isFatherRestrictedYes = false;
    isFatherRestrictedNo = false;
    isFatherRightsTerminatedYes = false;
    isFatherRightsTerminatedNo = false;
    fatherAdditionalDetails: string;
    advocateName: string;
    advocateAddress: string;
    advocatePhone: string;
    advocateEmail: string;
    advocateAlternateContact: string;
    managerName: string;
    managerAddress: string;
    managerPhone: string;
    managerOfficePhone: string;
    managerEmail: string;
    managerFax: string;
    supervisorName: string;
    supervisorPhone: string;
    supervisorOfficePhone: string;
    supervisorEmail: string;
    supervisorFax: string;
    fosterCareName: string;
    fosterCareAddress: string;
    fosterCarePhone: string;
    fosterCareOfficePhone: string;
    fosterCareEmail: string;
    fosterCareFax: string;
    administratorName: string;
    administratorAddress: string;
    administratorPhone: string;
    administratorOfficePhone: string;
    administratorEmail: string;
    administratorFax: string;
    participateInStaffing: string;
    previousSchoolPhoneNumber: any;
    schoolFaxEmail: any;
    isPhoneEnable = false;
    isemailEnable = false;
    isDecisionMakerNo = false;
    isDecisionMakerYes = false;
    isSchoolOfOriginNameEnable = false;
    isPreviousSchoolNameEnable = false;
    isAdvocateName = false;
    isAdvInprogress = false;
    previousSchoolESSAPhoneNumber: any;
    familySupWorkAddress: any;
    familySupWorkPhone: any;
    familySupWorkOfficePhone: any;
    familySupWorkEmail: any;
    familySupWorkFax: any;
    eduCoordName: any;
    eduCoordAddress: any;
    eduCoordPhone: any;
    eduCoordOfficePhone: any;
    eduCoordEmail: any;
    eduCoordFax: any;
    supervisorAddress: any;
    dcfFostName: any;
    dcfFostAddress: any;
    dcfFostPhone: any;
    dcfFostOfficePhone: any;
    dcfFostEmail: any;
    dcfFostFax: any;
    DOPBeginDate: any;
    DOPEndDate: any;
    p_DOPBeginDate: any;
    p_DOPEndDate: any;
    orgin_usdName: any;
    usd_orgin_Number: any;
    pre_usdName: any;
    usd_pre_Number: any;
    familySupportWorkerName: any;
    schoolID1: any;
    schoolID2: any;
    schoolFax: any;
    school1Fax: any;
    managerOfficePhone_extension: any;
    familySupWorkOfficePhone_extension: any;
    supervisorOfficePhone_extension: any;
    eduCoordOfficePhone_extension: any;
    fosterCareOfficePhone_extension: any;
    essa1_phoneNumber: any;
    essa1_email: any;
    essa2_email: any;
    dateStaffed1: any;
    dateStaffed2: any;
    previousSchoolESSAEmail: any;
    isSchoolName_Text = false;
    isOrgin_schoolnameText = false;
    isPreviousSchoolNameText = false;
    isCaregiverRequires = false;
    isPlacementNamesText = false;
    isPreviousPlacemengText = false;
    isEDuPlacementNametext = false;
    sixth_conta_cellPhone: any;
    sixth_conta_email: any;
    sixth_conta_fax: any;
    sixth_conta_fullAddress: any;
    sixth_conta_workPhone: any;
    sixth_conta_fullName: any;
    sixth_conta_extension: any;
}

export class AutofetchEeispf {
    lastTwoAttendingSchool: LastAttendingSchool[];
    clientCaseTeamDetails: clientCaseTeam[];
    placementDetails: placementDetails[];
    clientFamilyMemberDetails: familyMemeber[];
}

export class LastAttendingSchool {
    clientID: number;
    clientName: string;
    schoolID: number;
    schoolName: any;
    registrarEmail: string;
    city: string;
    beginDate: number;
    endDate?: any;
    eSSAPointOfContact: string;
    fax: any;
    state: any;
    phone: any;
    address: any;
    zipcode: any;
    usd: any;
}

export class clientCaseTeam {
    referralID: number;
    personType: string;
    lastName: string;
    firstName: string;
    address?: any;
    city?: any;
    state: string;
    zipcode: string;
    workPhone?: any;
    fax?: any;
    cellPhone?: any;
    email?: any;
    extension: any;
}

export class placementDetails {
    placementName: any;
    address1: string;
    fax?: any;
    phone: string;
    zipcode: number;
    city: string;
    clientName: string;
    Email?: any;
    dob: any;
    ssn: string;
    DateOfPlacement: number;
    state: any;
    beginDate: any;
    endDate: any;
}

export class familyMemeber {
    address: string;
    cellPh: any;
    city: string;
    clientName: string;
    email: string;
    fax: string;
    homePh: string;
    personType: string;
    state: string;
    workPh: string;
    zipcode: string;
    familyMemberName: any;
}
