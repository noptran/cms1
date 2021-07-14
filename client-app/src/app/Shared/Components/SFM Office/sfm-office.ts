export class AgencySFMOffice {
    cityID: any;
    officeName: string;
    phone: string;
    tollFreeNumber: string;
    fax: string;
    facilityID: any;
    isFCHOffice: boolean;
    isMainOffice: boolean;
    address: string;
    stateID: any;
    zipcodeID: any;
    sRSAreaOfficeID: any;
    cT_StaffID: any;
    careCenter_StaffID: any;
    catchmentAreaID: any;
    notes: string;
    sFAOfficeGLKeyList: GLKeys[];
    sfaofficeID: any;
}

export class GLKeys {
    beginDate: any;
    endDate?: any;
    glKeyTypeID: any;
    glKey: string;
    notes: string;
    sfaOfficeGLKeyID: number;
}
