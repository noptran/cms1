export class FchLevelCare {
  isBasic = false;
  isIntensive = false;
  isPreAdoptive = false;
  isEmergency = false;
  isIntensivePlus = false;
  isRespite = false;
  isHcbs = false;
  isJJFC = false;
  isRespiteWeekend = false;
  isInformalCare = false;
  isModerate = false;
  isSC = false;

}

export class FchDefaultValues {
  discardTo: string;
  breadcrumbs: any[] = [];
  isEdit: boolean;
  providerId: number;
  staffName: string;
  currentDate: Date;
  fchLevelIdList: any;
  fchLevelListData: any[];
  fchLevelDeletableData: any[] = [];
}
