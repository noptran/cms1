import { sharedMedications } from "./shared-medications";

export class SharedMedicationsDomain {


    constructor() { }

    public stringFormatDatetime(timeStamp: any) {
        return !isNaN(timeStamp) ?
            `${new Date(timeStamp).getFullYear()}-${String(new Date(timeStamp).getMonth() + 1).padStart(2, '0')}-${String(new Date(timeStamp).getDate()).padStart(2, '0')} ${String(new Date(timeStamp).getHours()).padStart(2, '0')}:${String(new Date(timeStamp).getMinutes()).padStart(2, '0')}:${String(new Date(timeStamp).getSeconds()).padStart(2, '0')}.000` : null;
    }

    saveMedications(medicationsDetails: sharedMedications) {
        medicationsDetails.beginDate = (medicationsDetails.beginDate) ? this.stringFormatDatetime(medicationsDetails.beginDate) : null;
        medicationsDetails.endDate = (medicationsDetails.endDate) ? this.stringFormatDatetime(medicationsDetails.endDate) : null;
        medicationsDetails.dosageTypeID = (medicationsDetails.dosageTypeID) ? medicationsDetails.dosageTypeID.dosageTypeID : null;
        medicationsDetails.frequencyTypeID = (medicationsDetails.frequencyTypeID) ? medicationsDetails.frequencyTypeID.frequencyTypeID : null;
        return medicationsDetails;
    }

    getMedicationsRecord(medicationsDetails: sharedMedications) {
        medicationsDetails.beginDate = (medicationsDetails.beginDate) ? new Date(medicationsDetails.beginDate) : null;
        medicationsDetails.endDate = (medicationsDetails.endDate) ? new Date(medicationsDetails.endDate) : null;
        return medicationsDetails;
    }

    updateMedications(medicationsDetails: sharedMedications) {
        medicationsDetails.dosageTypeID = (medicationsDetails.dosageTypeID) ? medicationsDetails.dosageTypeID.dosageTypeID : null;
        medicationsDetails.frequencyTypeID = (medicationsDetails.frequencyTypeID) ? medicationsDetails.frequencyTypeID.frequencyTypeID : null;
        return medicationsDetails;
    }
}