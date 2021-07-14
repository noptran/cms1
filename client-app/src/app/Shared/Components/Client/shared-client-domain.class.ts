import { SharedClient } from "./shared-client";

export class ShareClientClass {

    client: SharedClient = new SharedClient();

    constructor() { }

    updateClient = (clientDetail: SharedClient) => {
        clientDetail.countyID = (clientDetail.countyID) ? clientDetail.countyID.countyID : null;
        clientDetail.cityID = (clientDetail.cityID) ? clientDetail.cityID.cityID : null;
        clientDetail.stateID = (clientDetail.stateID) ? clientDetail.stateID.stateID : null;
        clientDetail.zipcodeID = (clientDetail.zipcodeID) ? clientDetail.zipcodeID.zipcodeID : null;
        clientDetail.ethnicityID = (clientDetail.ethnicityID) ? clientDetail.ethnicityID.ethnicityID : null;
        clientDetail.conST = (clientDetail.conST) ? clientDetail.conST.stateID : null;
        clientDetail.genderID = (clientDetail.genderID) ? clientDetail.genderID.genderID : null;
        clientDetail.raceID = (clientDetail.raceID) ? clientDetail.raceID.raceID : null;
        clientDetail.tribeID = (clientDetail.tribeID) ? clientDetail.tribeID.tribeID : null;
        clientDetail.insuranceTypeID = (clientDetail.insuranceTypeID) ? clientDetail.insuranceTypeID.insuranceTypeID : null;
        clientDetail.kanCareMCO_ProviderID = (clientDetail.kanCareMCO_ProviderID) ? clientDetail.kanCareMCO_ProviderID.providerID : null;
        clientDetail.dob = this.stringFormatDatetime(new Date(clientDetail.dob).getTime())
        this.client = clientDetail;
        return this.client;
    }

    getClientDetails = (clientDetail: SharedClient) => {
        clientDetail.dob = (clientDetail.dob) ? new Date(clientDetail.dob) : null;
        this.client = clientDetail;
        return this.client;
    }

    public stringFormatDatetime(timeStamp: any) {
        return !isNaN(timeStamp) ?
            `${new Date(timeStamp).getFullYear()}-${String(new Date(timeStamp).getMonth() + 1).padStart(2, '0')}-${String(new Date(timeStamp).getDate()).padStart(2, '0')} ${String(new Date(timeStamp).getHours()).padStart(2, '0')}:${String(new Date(timeStamp).getMinutes()).padStart(2, '0')}:${String(new Date(timeStamp).getSeconds()).padStart(2, '0')}.000` : null;
    }


}