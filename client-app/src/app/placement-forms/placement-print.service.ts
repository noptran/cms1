import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacementPrintService {
  printHistoryData = {
    PLACEMENT_STATUS: {
      form: 'PLACEMENT_STATUS',
      isEmailed: false,
      isPrinted: false,
      emailedDate: '',
      emailedStaff: '',
      emailedAddress: '',
      printedDate: '',
      printedStaff: ''
    },
    PROVIDER_SERVICE_AGREEMENT: {
      form: 'PROVIDER_SERVICE_AGREEMENT',
      isEmailed: false,
      isPrinted: false,
      emailedDate: '',
      emailedStaff: '',
      emailedAddress: '',
      printedDate: '',
      printedStaff: ''
    },
    ACKNOWLEDGEMENT: {
      form: 'ACKNOWLEDGEMENT',
      isEmailed: false,
      isPrinted: false,
      emailedDate: '',
      emailedStaff: '',
      emailedAddress: '',
      printedDate: '',
      printedStaff: ''
    },
    AGREEMENT: {
      form: 'AGREEMENT',
      isEmailed: false,
      isPrinted: false,
      emailedDate: '',
      emailedStaff: '',
      emailedAddress: '',
      printedDate: '',
      printedStaff: ''
    }
  };
  constructor() { }

  // Default Print History Data----Will be updated for every mail and print implementation
  storeHistoryData(): any {

    this.printHistoryData = {
      PLACEMENT_STATUS: {
        form: 'PLACEMENT_STATUS',
        isEmailed: false,
        isPrinted: false,
        emailedDate: '',
        emailedStaff: '',
        emailedAddress: '',
        printedDate: '',
        printedStaff: ''
      },
      PROVIDER_SERVICE_AGREEMENT: {
        form: 'PROVIDER_SERVICE_AGREEMENT',
        isEmailed: false,
        isPrinted: false,
        emailedDate: '',
        emailedStaff: '',
        emailedAddress: '',
        printedDate: '',
        printedStaff: ''
      },
      ACKNOWLEDGEMENT: {
        form: 'ACKNOWLEDGEMENT',
        isEmailed: false,
        isPrinted: false,
        emailedDate: '',
        emailedStaff: '',
        emailedAddress: '',
        printedDate: '',
        printedStaff: ''
      },
      AGREEMENT: {
        form: 'AGREEMENT',
        isEmailed: false,
        isPrinted: false,
        emailedDate: '',
        emailedStaff: '',
        emailedAddress: '',
        printedDate: '',
        printedStaff: ''
      }
    };
  }
}
