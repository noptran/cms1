import { SharedAllergies } from "./shared-allergies";

export class SharedAllergiesDomain {
    allergies: SharedAllergies = new SharedAllergies();

    constructor() { }

    public stringFormatDatetime(timeStamp: any) {
        return !isNaN(timeStamp) ?
            `${new Date(timeStamp).getFullYear()}-${String(new Date(timeStamp).getMonth() + 1).padStart(2, '0')}-${String(new Date(timeStamp).getDate()).padStart(2, '0')} ${String(new Date(timeStamp).getHours()).padStart(2, '0')}:${String(new Date(timeStamp).getMinutes()).padStart(2, '0')}:${String(new Date(timeStamp).getSeconds()).padStart(2, '0')}.000` : null;
    }

    saveAllergies(allergiesDetails: SharedAllergies) {
        return allergiesDetails;
    }

    getAllergies(allergiesDetails: SharedAllergies) {
        allergiesDetails.notificationDate = (allergiesDetails.notificationDate) ? new Date(allergiesDetails.notificationDate) : null;
        return allergiesDetails;
    }

    updateAllergies(allergiesDetails: SharedAllergies) {
        return allergiesDetails;
    }

}