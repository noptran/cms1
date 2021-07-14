export class FamilyChangeProviderProfile {
  fchOffice: any;
  fedTaxNo: any;
  isEmployee: any;
  isFamilyMatters: any;
  isSponsor: any;
  paySemiMonthly: any;
  phone: any;
  picPath: any;
  providerName: any;
  providerStatusType: any;
  providerType: any;
  sfcsAssignedStaff: any;
  sponsorName: any;
  venderID: any;
}

export class FamilyChangeWeeklyDateRange {
  weeklyBeginDate: string;
  weeklyEndDate: string;
  weeklyDateID: number;
  weeklyDateRange: string;
}

export class FamilyChangeProviderType {
  providerWeeklyChangeReasonID: number;
  staffID: any;
  providerID: any;
  weeklyDateID: number;
  providerType: any;
  currentValue?: any;
  enteredBy: string;
  enteredDate: number;
  providerWeeklyChangeID: number;
  changedBy: string;
  changedDate: number;
  staffIDWhoShouldAuth: number;
  status: string;
  notes?: any;
  eKidzUpdateSPName: string;
}

export class FamilyChangeProviderTypeReason {
  selectedProviderType: FamilyChangeProviderType;
  currentValue = 'Adopt/Foster';
  status = 'Pending';
  notes: string;
}

export class FamilyChangeCurrentValues {
  levelOfCare: string;
  providerType: string;
  daycareHoursRequired: string;
  providerStatusType: string;
  youngestAge: number;
  oldestAge: number;
  ageIsFlexible: boolean;
  race: any;
  raceIsFlexible: boolean;
  capacity: number;
  genderGroup: any;
  genderIsFlexible: boolean;
  licenseCapacity: any;
  youngestLicensed: any;
  oldestLicensed: any;
}

export class FamilyChangePreferredCapacity {
  preferredCapacity: any;
  currentValue = '2';
  status = 'Pending';
  notes: string;
}
export class GenderFamilyChange {
  genderGroup: string;
  genderGroupID: number;
}
export class FamilyChangePreferredGender {
  preferredGender: GenderFamilyChange;
  currentValue = 'Female';
  status = 'Auto Approve';
  notes: string;
}
