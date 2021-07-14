import { SharedSchool } from "./shared-school";

export class SharedSchoolDomain {

    school: SharedSchool = new SharedSchool();

    constructor() { }

    stringFormatDatetime(timeStamp: any) {
        return !isNaN(timeStamp) ?
            `${new Date(timeStamp).getFullYear()}-${String(new Date(timeStamp).getMonth() + 1).padStart(2, '0')}-${String(new Date(timeStamp).getDate()).padStart(2, '0')} ${String(new Date(timeStamp).getHours()).padStart(2, '0')}:${String(new Date(timeStamp).getMinutes()).padStart(2, '0')}:${String(new Date(timeStamp).getSeconds()).padStart(2, '0')}.000` : null;
    }

    schoolSave(schoolDetails: SharedSchool) {
        schoolDetails.beginDate = (schoolDetails.beginDate) ? this.stringFormatDatetime(schoolDetails.beginDate) : null;
        schoolDetails.endDate = (schoolDetails.endDate) ? this.stringFormatDatetime(schoolDetails.endDate) : null;
        schoolDetails.enrolledBeginDate = (schoolDetails.enrolledBeginDate) ? this.stringFormatDatetime(schoolDetails.enrolledBeginDate) : null;
        schoolDetails.enrolledEndDate = (schoolDetails.enrolledEndDate) ? this.stringFormatDatetime(schoolDetails.enrolledEndDate) : null;
        schoolDetails.schoolID = (schoolDetails.schoolID) ? schoolDetails.schoolID.schoolID : null;
        schoolDetails.changeReasonID = (schoolDetails.changeReasonID) ? schoolDetails.changeReasonID.changeReasonID : null;
        return schoolDetails;
    }

    schoolGet(schoolDetails: SharedSchool) {
        schoolDetails.beginDate = (schoolDetails.beginDate) ? new Date(schoolDetails.beginDate) : null;
        schoolDetails.endDate = (schoolDetails.endDate) ? new Date(schoolDetails.endDate) : null;
        schoolDetails.enrolledBeginDate = (schoolDetails.enrolledBeginDate) ? new Date(schoolDetails.enrolledBeginDate) : null;
        schoolDetails.enrolledEndDate = (schoolDetails.enrolledEndDate) ? new Date(schoolDetails.enrolledEndDate) : null;
        return schoolDetails;
    }

    schoolUpdate(schoolDetails: SharedSchool) { 
        schoolDetails.schoolID = (schoolDetails.schoolID) ? schoolDetails.schoolID.schoolID : null;
        schoolDetails.changeReasonID = (schoolDetails.changeReasonID) ? schoolDetails.changeReasonID.changeReasonID : null;
        return schoolDetails;
    }



}