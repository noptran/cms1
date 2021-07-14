import { SharedFamilyMember } from "./shared-family-member";

export class FamilyMemberDomainClass {
    familyMember: SharedFamilyMember = new SharedFamilyMember();

    constructor() { }

    saveFamilyMember(familyMemberData: SharedFamilyMember) {
        familyMemberData.beginDate = (familyMemberData.beginDate) ? this.stringFormatDatetime(familyMemberData.beginDate) : null;
        familyMemberData.endDate = (familyMemberData.endDate) ? this.stringFormatDatetime(familyMemberData.endDate) : null;
        familyMemberData.familyMemberID = (familyMemberData.familyMemberID) ? familyMemberData.familyMemberID.familyMemberID : null;
        familyMemberData.familyMemberTypeID = (familyMemberData.familyMemberTypeID) ? familyMemberData.familyMemberTypeID.familyMemberTypeID : null;
        familyMemberData.frequencyTypeID = (familyMemberData.frequencyTypeID) ? familyMemberData.frequencyTypeID.frequencyTypeID : null;
        familyMemberData.personTypeID = (familyMemberData.personTypeID) ? familyMemberData.personTypeID.personTypeID : null;
        familyMemberData.restrictionTypeID = (familyMemberData.restrictionTypeID) ? familyMemberData.restrictionTypeID.restrictionTypeID : null;
        return familyMemberData;
    }

    stringFormatDatetime(timeStamp: any) {
        return !isNaN(timeStamp) ?
            `${new Date(timeStamp).getFullYear()}-${String(new Date(timeStamp).getMonth() + 1).padStart(2, '0')}-${String(new Date(timeStamp).getDate()).padStart(2, '0')} ${String(new Date(timeStamp).getHours()).padStart(2, '0')}:${String(new Date(timeStamp).getMinutes()).padStart(2, '0')}:${String(new Date(timeStamp).getSeconds()).padStart(2, '0')}.000` : null;
    }

    getFamilyMember(familyMemberData: SharedFamilyMember) {
        familyMemberData.familyMemberID['name'] = `${familyMemberData.familyMemberID.lastName},${familyMemberData.familyMemberID.firstName}`;
        familyMemberData.beginDate = (familyMemberData.beginDate) ? new Date(familyMemberData.beginDate) : null;
        familyMemberData.endDate = (familyMemberData.endDate) ? new Date(familyMemberData.endDate) : null;
        return familyMemberData;
    }

    updateFamilyMember(familyMemberData: SharedFamilyMember) {
        familyMemberData.familyMemberID = (familyMemberData.familyMemberID) ? familyMemberData.familyMemberID.familyMemberID : null;
        familyMemberData.familyMemberTypeID = (familyMemberData.familyMemberTypeID) ? familyMemberData.familyMemberTypeID.familyMemberTypeID : null;
        familyMemberData.frequencyTypeID = (familyMemberData.frequencyTypeID) ? familyMemberData.frequencyTypeID.frequencyTypeID : null;
        familyMemberData.personTypeID = (familyMemberData.personTypeID) ? familyMemberData.personTypeID.personTypeID : null;
        familyMemberData.restrictionTypeID = (familyMemberData.restrictionTypeID) ? familyMemberData.restrictionTypeID.restrictionTypeID : null;
        return familyMemberData;
    }

}