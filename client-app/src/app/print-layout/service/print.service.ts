import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  isPrinting = false;
  ntffData = {
    ntffPrintJson: '',
    ntff: '',
    alone_list: '',
    nexAppointmentAlongWithDate: ''
  };
  workerChildData: any;
  workerParentData: any;
  parentChildData: any;
  caseActivityData: any;
  pps0550Data: any;
  kansasData: any;
  referralAckForm: any;

  constructor(public router: Router) { }

  printDocument(documentName: string, data) {
    this.isPrinting = true;
    this.setPrintFormInfo(documentName, data);

    this.router.navigate(['/', { outlets: { 'print': ['print', documentName] } }], { queryParamsHandling: 'preserve' });

  }


  onDataReady() {
    setTimeout(() => {
      window.print();
      this.isPrinting = false;
      this.router.navigate([{ outlets: { print: null } }], { queryParamsHandling: 'preserve' });
    }, 3000);
  }

  setPrintFormInfo(documentName, data): any {

    switch (documentName) {
      case 'ntff':
        this.ntffData = data;
        break;

      case 'worker-child':
        this.workerChildData = data;
        break;

      case 'worker-parent':
        this.workerParentData = data;
        break;

      case 'parent-child':
        this.parentChildData = data;
        break;

      case 'move-form':
        // future implementation...
        break;

      case 'move-form-disruption':
        // future implementation...
        break;

      case 'placement-referral-draft':
        // future implementation...
        break;

      case 'placement-referral-blank':
        // future implementation...
        break;

      case 'placement-plan-blank':
        // future implementation...
        break;

      case 'case-activity':
        this.caseActivityData = data;
        break;

      case 'pps0550':
        this.pps0550Data = data;
        break;

      case 'kansas':
        this.kansasData = data;
        break;

      case 'referral-ack':
        this.referralAckForm = data;
        break;

      default:


    }
  }

}
