import {
  PRTFClientInfo,
  PRTFYouthAdditionalInfo,
  PRTFReferralInfo,
} from "./prtf";

export class PRTFComponetClass {
  public clientAutoFetchInfo: PRTFClientInfo;
  youthAdditionalInfo: PRTFYouthAdditionalInfo = new PRTFYouthAdditionalInfo();
  isUsCitizenShip = true;
  isPayorSourceCommunitySource = false;
  referralInfo: PRTFReferralInfo = new PRTFReferralInfo();

  constructor() {}

  stringFormatDatetime(timeStamp: any) {
    return !isNaN(timeStamp)
      ? `${new Date(timeStamp).getFullYear()}-${String(
          new Date(timeStamp).getMonth() + 1
        ).padStart(2, "0")}-${String(new Date(timeStamp).getDate()).padStart(
          2,
          "0"
        )} ${String(new Date(timeStamp).getHours()).padStart(2, "0")}:${String(
          new Date(timeStamp).getMinutes()
        ).padStart(2, "0")}:${String(new Date(timeStamp).getSeconds()).padStart(
          2,
          "0"
        )}.000`
      : null;
  }

  getClientInformation = (autoFetchInfo: PRTFClientInfo) => {
    this.clientAutoFetchInfo = autoFetchInfo;
    return this.clientAutoFetchInfo;
  };

  setClientInformation = (clientInfo: any) => {
    if (clientInfo) {
      clientInfo.city = clientInfo.cityID ? clientInfo.cityID.city : "";
      clientInfo.state = clientInfo.stateID ? clientInfo.stateID.state : "";
      clientInfo.gender = clientInfo.genderID ? clientInfo.genderID.gender : "";
      clientInfo.state = clientInfo.stateID ? clientInfo.stateID.state : "";
      clientInfo.zipcode = clientInfo.zipcodeID
        ? clientInfo.zipcodeID.zipcode
        : "";
      clientInfo.countyName = clientInfo.countyID
        ? clientInfo.countyID.countyName
        : "";
      clientInfo.race = clientInfo.raceID ? clientInfo.raceID.race : "";
      clientInfo.ethnicity = clientInfo.ethnicityID
        ? clientInfo.ethnicityID.ethnicity
        : "";
      clientInfo.tribe = clientInfo.tribeID ? clientInfo.tribeID.tribe : "";
      return clientInfo;
    } else {
      return {
        message: "unable to process!",
        detail: "Client information is empty!",
      };
    }
  };

  toggle(toggleStatus?: any) {
    return (this.isUsCitizenShip = toggleStatus ? false : true);
  }

  payorSocurceToggle(source?: string) {
    if (source === "communityMember") {
      this.referralInfo.payor_PersonAssignmentTypeID = 15;
      return (this.isPayorSourceCommunitySource = true);
    } else if (source === "sfcsStaff") {
      this.referralInfo.payor_PersonAssignmentTypeID = 2;
      return (this.isPayorSourceCommunitySource = false);
    } else {
      return;
    }
  }

  prtfSave(youthInfo: any) {
    console.log("Before save prtf ****", youthInfo);
    youthInfo.caseID = 0;
    youthInfo.referralDate = youthInfo.referralDate
      ? this.stringFormatDatetime(youthInfo.referralDate)
      : null;
    youthInfo.dischargeDate = youthInfo.dischargeDate
      ? this.stringFormatDatetime(new Date(youthInfo.dischargeDate).getTime())
      : null;
    youthInfo.dischargeReasonID = youthInfo.dischargeReasonID
      ? youthInfo.dischargeReasonID.closureReasonID
      : null;
    this.referralInfo.beginDate = this.referralInfo.beginDate
      ? this.stringFormatDatetime(this.referralInfo.beginDate)
      : null;
    this.referralInfo.payorID = this.referralInfo.payorID
      ? this.referralInfo.payorID.payorID
      : null;
    let personTypeName: string =
      this.referralInfo.payor_PersonAssignmentTypeID === 15
        ? "CommunityMemberID"
        : "StaffID";
    this.referralInfo.payor_personID = this.referralInfo.payor_personID
      ? this.referralInfo.payor_personID[personTypeName]
      : null;
    let request = {
      referralInfo: this.referralInfo,
      youthAdditionalInfo: youthInfo,
    };
    console.log("PRTF Save request", request);
    return request;
  }

  prtfUpdate(
    youthInfo: PRTFYouthAdditionalInfo,
    referralInfo: PRTFReferralInfo
  ) {
     youthInfo.dischargeReasonID = (youthInfo.dischargeReasonID) ? youthInfo.dischargeReasonID.closureReasonID : null;
    // referralInfo.payorID = (referralInfo.payorID) ? referralInfo.payorID.PayorID : null;
    // let personTypeName: string = (referralInfo.payor_PersonAssignmentTypeID === 4) ? 'CommunityMemberID' : 'StaffID';
    // referralInfo.payor_personID = (referralInfo.payor_personID) ? referralInfo.payor_personID[personTypeName] : null;
    delete youthInfo["Weight"];
    delete youthInfo["Height"];
    youthInfo.dischargeDate = youthInfo.dischargeDate
      ? this.stringFormatDatetime(new Date(youthInfo.dischargeDate).getTime())
      : null;
    this.referralInfo.beginDate = this.referralInfo.beginDate
      ? this.stringFormatDatetime(this.referralInfo.beginDate)
      : null;
    this.referralInfo.payorID = this.referralInfo.payorID
      ? this.referralInfo.payorID.payorID
      : null;
    let personTypeName: string =
    this.referralInfo.payor_PersonAssignmentTypeID === 15
      ? "CommunityMemberID"
      : "StaffID";
    this.referralInfo.payor_personID = this.referralInfo.payor_personID
      ? this.referralInfo.payor_personID[personTypeName]
      : null;
    this.referralInfo.payor_PersonAssignmentTypeID  = this.referralInfo.payor_PersonAssignmentTypeID 
      ? this.referralInfo.payor_PersonAssignmentTypeID.payor_PersonAssignmentTypeID 
      : null;
    referralInfo["caseID"] = youthInfo.caseID;
    let request = {
      referralInfo: referralInfo,
      youthAdditionalInfo: youthInfo,
    };
    console.log("PRTF update request", request);
    return request;
  }
}
