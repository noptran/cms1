
export class ProviderSponsorData {
  beginDate: any;
  dateOverride: any;
  payorRate: any;
  unitTypeID: UnitTypeID;
  units: any;
  endDate: any;
  procodeID: procodeID;
  providerRate: any;
  hourlyUnits: any;
  paymentTypeID: paymentTypeID;
  providerID: providerID;
  receivedDate: any;
  clientID: clientID;
  notes: any;
  paymentDueDate: any;
  isNotFCHWeb: any;
  paymentNotes: any;

}

export class AuthData {
  beginDate: any;
  providerID: providerID;
  payorRate: any;
  unitTypeID: UnitTypeID;
  unitsAuth: any;
  payPlacement: any;
  paySponser: any;
  endDate: any;
  procodeID: procodeID;
  providerRate: any;
  unitsRemaining: any;
  payorAuthorizationID: any;

}

export class UnitTypeID {
  unitType: any;
}

export class procodeID {
  procode: any;
}

export class paymentTypeID {
  paymentType: any;
}

export class providerID {
  providerName: any;
}

export class clientID {
  address: any;
  cityID: cityID;
  stateID: stateID;
  zipcodeID: zipcodeID;
}

export class cityID {
  city: any;
}

export class stateID {
  state: any;
}

export class zipcodeID {
  zipcodeID: any;
}

