import { SharedTreatment } from "./tratment";

export class TreatmentDecisionsDoamin {

    treatmentDecision: SharedTreatment = new SharedTreatment();

    constructor() { }

    saveTreatmentDecision(treatmentDecisionDetais: SharedTreatment) {
        treatmentDecisionDetais.beginDate = (treatmentDecisionDetais.beginDate) ? this.stringFormatDatetime(treatmentDecisionDetais.beginDate) : null;
        treatmentDecisionDetais.endDate = (treatmentDecisionDetais.endDate) ? this.stringFormatDatetime(treatmentDecisionDetais.endDate) : null;
        let personAssignmentTypeID: string = (treatmentDecisionDetais.personID === 4) ? 'familyMemberID' : 'caseTeamID';
        treatmentDecisionDetais.personAssignmentTypeID = (treatmentDecisionDetais.personID) ? treatmentDecisionDetais.personAssignmentTypeID.personAssignmentTypeID : null;
        treatmentDecisionDetais.personID = (treatmentDecisionDetais.personAssignmentTypeID) ? treatmentDecisionDetais.personID[personAssignmentTypeID] : null;
        return treatmentDecisionDetais;
    }

    stringFormatDatetime(timeStamp: any) {
        return !isNaN(timeStamp) ?
            `${new Date(timeStamp).getFullYear()}-${String(new Date(timeStamp).getMonth() + 1).padStart(2, '0')}-${String(new Date(timeStamp).getDate()).padStart(2, '0')} ${String(new Date(timeStamp).getHours()).padStart(2, '0')}:${String(new Date(timeStamp).getMinutes()).padStart(2, '0')}:${String(new Date(timeStamp).getSeconds()).padStart(2, '0')}.000` : null;
    }

    getTreatmentDecisons(treatmentDecisionDetais: SharedTreatment) {
        treatmentDecisionDetais.beginDate = (treatmentDecisionDetais.beginDate) ? new Date(treatmentDecisionDetais.beginDate) : null;
        treatmentDecisionDetais.endDate = (treatmentDecisionDetais.endDate) ? new Date(treatmentDecisionDetais.endDate) : null;
        return treatmentDecisionDetais;
    }

    updateTreatmentDecisons(treatmentDecisionDetais: SharedTreatment) {
        treatmentDecisionDetais.personID = (treatmentDecisionDetais.personAssignmentTypeID) ? treatmentDecisionDetais.personAssignmentTypeID.personAssignmentTypeID : null;
        let personAssignmentTypeID: string = (treatmentDecisionDetais.personID === 4) ? 'familyMemberID' : 'caseTeamID';
        treatmentDecisionDetais.personAssignmentTypeID = (treatmentDecisionDetais.personID) ? treatmentDecisionDetais.personID[personAssignmentTypeID] : null;
        return treatmentDecisionDetais;
    }


}