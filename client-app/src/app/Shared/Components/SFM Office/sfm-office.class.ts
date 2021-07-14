import { AgencySFMOffice, GLKeys } from './sfm-office';
import { isNullOrUndefined } from 'util';
import {LocalValues} from '../../../local-values';

export class AppSharedSFMOfficeDomain {
  agencySFMOffice: AgencySFMOffice = new AgencySFMOffice();
  glKey: GLKeys = new GLKeys();

  constructor() {}

  saveForm() {
    console.log('SFM Office Save', this.agencySFMOffice);
    !isNullOrUndefined(this.agencySFMOffice.cT_StaffID)
      ? (this.agencySFMOffice.cT_StaffID = this.agencySFMOffice.cT_StaffID.StaffID)
      : null;
    !isNullOrUndefined(this.agencySFMOffice.cityID)
      ? (this.agencySFMOffice.cityID = this.agencySFMOffice.cityID.cityID)
      : null;
    !isNullOrUndefined(this.agencySFMOffice.stateID)
      ? (this.agencySFMOffice.stateID = this.agencySFMOffice.stateID.stateID)
      : null;
    !isNullOrUndefined(this.agencySFMOffice.careCenter_StaffID)
      ? (this.agencySFMOffice.careCenter_StaffID = this.agencySFMOffice.careCenter_StaffID.staffID)
      : null;
    !isNullOrUndefined(this.agencySFMOffice.zipcodeID)
      ? (this.agencySFMOffice.zipcodeID = this.agencySFMOffice.zipcodeID.zipcodeID)
      : null;
    !isNullOrUndefined(this.agencySFMOffice.sRSAreaOfficeID)
      ? (this.agencySFMOffice.sRSAreaOfficeID = this.agencySFMOffice.sRSAreaOfficeID.sRSAreaOfficeID)
      : null;
    !isNullOrUndefined(this.agencySFMOffice.catchmentAreaID)
      ? (this.agencySFMOffice.catchmentAreaID = this.agencySFMOffice.catchmentAreaID.catchmentAreaID)
      : null;
    return this.agencySFMOffice;
  }

  getById(data: AgencySFMOffice) {
    // !isNullOrUndefined(data.careCenter_StaffID) ? data.careCenter_StaffID['staffName'] = `${data.careCenter_StaffID.lastName, data.careCenter_StaffID.firstName}` : null;
    !isNullOrUndefined(data.sRSAreaOfficeID)
      ? (data.sRSAreaOfficeID['dISPLN'] = data.sRSAreaOfficeID.officeName)
      : null;
    // !isNullOrUndefined(data.cT_StaffID) ? data.cT_StaffID['StaffName'] = `${data.careCenter_StaffID.lastName, data.careCenter_StaffID.firstName}` : null;
    return data;
  }

  saveGLKeyData() {
    !isNullOrUndefined(this.glKey.beginDate)
      ? (this.glKey.beginDate = this.stringFormatDatetime(
          Date.parse(this.glKey.beginDate)
        ))
      : null;
    !isNullOrUndefined(this.glKey.endDate)
      ? (this.glKey.endDate = this.stringFormatDatetime(
          Date.parse(this.glKey.endDate)
        ))
      : null;
    !isNullOrUndefined(this.glKey.glKeyTypeID)
      ? (this.glKey.glKeyTypeID = this.glKey.glKeyTypeID.glKeyTypeID)
      : null;
    return this.glKey;
  }

  public stringFormatDatetime(timeStamp: any) {
    return !isNaN(timeStamp)
      ? `${new Date(timeStamp).getFullYear()}-${String(
          new Date(timeStamp).getMonth() + 1
        ).padStart(2, '0')}-${String(new Date(timeStamp).getDate()).padStart(
          2,
          '0'
        )} ${String(new Date(timeStamp).getHours()).padStart(2, '0')}:${String(
          new Date(timeStamp).getMinutes()
        ).padStart(2, '0')}:${String(new Date(timeStamp).getSeconds()).padStart(
          2,
          '0'
        )}.000`
      : null;
  }

  getGLKeyID(data: GLKeys) {
    !isNullOrUndefined(data.beginDate)
      ? (data.beginDate = new Date(data.beginDate))
      : null;
    !isNullOrUndefined(data.endDate)
      ? (data.endDate = new Date(data.endDate))
      : null;
    return data;
  }
}
