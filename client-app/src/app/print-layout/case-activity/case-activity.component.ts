import { Component, OnInit } from '@angular/core';
import { PrintService } from '../service/print.service';

@Component({
  selector: 'app-case-activity',
  templateUrl: './case-activity.component.html',
  styleUrls: ['./case-activity.component.scss']
})
export class CaseActivityComponent implements OnInit {
  caseActPrintValues: any;
  printStaffNotes: any;
  printProcode: any;
  printStaffName: any;
  printFacts: any;
  printKaecses: any;

  constructor(public printService: PrintService) { }

  ngOnInit() {

    this.caseActPrintValues = this.printService.caseActivityData.caseActPrintValues;
    this.printStaffNotes = this.printService.caseActivityData.printStaffNotes;
    this.printProcode = this.printService.caseActivityData.printProcode;
    this.printStaffName = this.printService.caseActivityData.printStaffName;
    this.printFacts = this.printService.caseActivityData.facts;
    this.printKaecses = this.printService.caseActivityData.kaecses;
    console.log("this.caseActPrintValues in NGONIT is", this.caseActPrintValues)
    // this.passData();
    this.printService.isPrinting = true;
    this.printService.onDataReady();
  }

  // passData() {

  //   let re = /\r\n|\n\r|\n|\r/g;
  //   let arr = this.printStaffNotes.replace(re, "\n").split("\n");
  //   arr.map((item) => {
  //     if (item === '') {
  //       item = `<br>`;
  //     }
  //   });
  //   this.printStaffNotes = arr;

  // }

}
