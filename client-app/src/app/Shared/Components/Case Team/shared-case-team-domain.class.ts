import { SharedCaseTeam } from "./shared-case-team";

export class SharedCaseTeamDomain {
    caseTeam: SharedCaseTeam = new SharedCaseTeam();
    constructor() { }

    public stringFormatDatetime(timeStamp: any) {
        return !isNaN(timeStamp) ?
            `${new Date(timeStamp).getFullYear()}-${String(new Date(timeStamp).getMonth() + 1).padStart(2, '0')}-${String(new Date(timeStamp).getDate()).padStart(2, '0')} ${String(new Date(timeStamp).getHours()).padStart(2, '0')}:${String(new Date(timeStamp).getMinutes()).padStart(2, '0')}:${String(new Date(timeStamp).getSeconds()).padStart(2, '0')}.000` : null;
    }

    caseTeamSave(caseTeamDetails: SharedCaseTeam) {
        caseTeamDetails.beginDate = (caseTeamDetails.beginDate) ? this.stringFormatDatetime(new Date(caseTeamDetails.beginDate).getTime()) : null;
        caseTeamDetails.endDate = (caseTeamDetails.endDate) ? this.stringFormatDatetime(new Date(caseTeamDetails.endDate).getTime()) : null;
        caseTeamDetails.contract_StateID = (caseTeamDetails.contract_StateID) ? caseTeamDetails.contract_StateID.stateID : null;
        let personType = this.setSelectedPersonId(caseTeamDetails.personAssignmentTypeID.personAssignmentTypeID)
        caseTeamDetails.personAssignmentTypeID = (caseTeamDetails.personAssignmentTypeID) ? caseTeamDetails.personAssignmentTypeID.personAssignmentTypeID : null;
        console.log("Selected person type", personType, caseTeamDetails.personID[personType]);
        caseTeamDetails.personID = (caseTeamDetails.personID) ? caseTeamDetails.personID[personType] : null;
        caseTeamDetails.personTypeID = (caseTeamDetails.personTypeID) ? caseTeamDetails.personTypeID.personTypeID : null;
        return caseTeamDetails;
    }

    public setSelectedPersonId = (personAssignmentTypeID: number) => {
        let personType: string;
        if (personAssignmentTypeID == 1) {
            personType = 'clientID';
        }
        else if (personAssignmentTypeID == 2) {
            personType = 'staffID';
        }
        else if (personAssignmentTypeID == 3) {
            personType = 'providerMemberID';
        }
        else if (personAssignmentTypeID == 4) {
            personType = 'familyMemberID';
        }
        else if (personAssignmentTypeID == 5) {
            personType = 'judgeID';
        }
        else if (personAssignmentTypeID == 6) {
            personType = 'srsstaffID';
        }
        else if (personAssignmentTypeID == 8) {
            personType = 'csvid';
        }
        else if (personAssignmentTypeID == 9) {
            personType = 'galid';
        }
        else if (personAssignmentTypeID == 10) {
            personType = 'casaOfficerID';
        }
        else if (personAssignmentTypeID == 11) {
            personType = 'crbcoordinatorID';
        }
        else if (personAssignmentTypeID == 15) {
            personType = 'communityMemberID';
        }
        else if (personAssignmentTypeID == 16) {
            personType = 'custCarePersonID';
        }
        else if (personAssignmentTypeID == 17) {
            personType = 'dhsStaffID';
        }
        else if (personAssignmentTypeID == 20) {
            personType = 'dhhsStaff';
        }
        else if (personAssignmentTypeID == 21) {
            personType = 'otherAgencyStaffID';
        }
        else if (personAssignmentTypeID == 22) {
            personType = 'CSOStaffID';
        }
        return personType;
    }

    caseTeamGet(caseTeamDetails: SharedCaseTeam) {
        caseTeamDetails.beginDate = (caseTeamDetails.beginDate) ? new Date(caseTeamDetails.beginDate) : null;
        caseTeamDetails.endDate = (caseTeamDetails.endDate) ? new Date(caseTeamDetails.endDate) : null;
        caseTeamDetails.personID['fullName'] = (caseTeamDetails.personID) ? `${caseTeamDetails.personID.LastName},${caseTeamDetails.personID.FirstName}` : null;
        return caseTeamDetails;
    }

    caseTeamUpdate(caseTeamDetails: SharedCaseTeam) {
        caseTeamDetails.beginDate = (caseTeamDetails.beginDate) ? this.stringFormatDatetime(new Date(caseTeamDetails.beginDate).getTime()) : null;
        caseTeamDetails.endDate = (caseTeamDetails.endDate) ? this.stringFormatDatetime(new Date(caseTeamDetails.endDate).getTime()) : null;
        caseTeamDetails.contract_StateID = (caseTeamDetails.contract_StateID) ? caseTeamDetails.contract_StateID.stateID : null;
        let personType = this.setSelectedPersonId(caseTeamDetails.personAssignmentTypeID.personAssignmentTypeID)
        caseTeamDetails.personAssignmentTypeID = (caseTeamDetails.personAssignmentTypeID) ? caseTeamDetails.personAssignmentTypeID.personAssignmentTypeID : null;
        console.log("Selected person type", personType, caseTeamDetails.personID[personType]);
        caseTeamDetails.personID = (caseTeamDetails.personID) ? caseTeamDetails.personID[personType] : null;
        caseTeamDetails.personTypeID = (caseTeamDetails.personTypeID) ? caseTeamDetails.personTypeID.personTypeID : null;
        caseTeamDetails.clientID = (caseTeamDetails.clientID) ? caseTeamDetails.clientID.clientID : null;
        caseTeamDetails.referralID = (caseTeamDetails.referralID) ? caseTeamDetails.referralID.referralID : null;
        return caseTeamDetails;

    }
} 