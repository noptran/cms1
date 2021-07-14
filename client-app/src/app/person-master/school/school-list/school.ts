export class School {

  GPSAddress = "";
  GPSCity = "";
  GPSState = "";
  GPSZipcode = "";
  changedBy = "ADMIN";
  enteredBy = "ADMIN";
  changedDate = 1575899880000;
  enteredDate = 1575899880000;

  // ------------
  schoolName: string;
  usd: string;
  buildingNumber: string;
  beginDate: any;
  endDate: any;
  address: string;
  isMultiState = false;
  isPrivate = false;
  cityID: any;
  stateID: any;
  zipcodeID: any;
  countyID: any;
  phone: string;
  fax: string;
  notes: string;
  principal_FirstName: string;
  principal_LastName: string;
  principal_MI: string;
  vicePrincipal_FirstName: string;
  vicePrincipal_LastName: string;
  vicePrincipal_MI: string;
  nurse_FirstName: string;
  nurse_LastName: string;
  nurse_MI: string;
  ESSAPointOfContact: string;
  registrarEmail: string;
  isDoNotSendToPOC = false;
  schoolID: any;
}
export class USD_data {
  usdID: any;
  usd: string;
  usdName: string;
  contactName: string;
  contactEmail: string;
  superintendent: string;
  superintendentEmail: string;
  phone: string;
}
