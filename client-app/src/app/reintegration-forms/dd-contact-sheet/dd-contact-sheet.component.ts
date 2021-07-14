
import { Component, OnInit } from '@angular/core';
import html2pdf from 'html2pdf.js';
import {PrintPdf} from "../../print-pdf";
///////////////////////////////
import { Router } from '@angular/router';

@Component({
  selector: 'app-dd-contact-sheet',
  templateUrl: './dd-contact-sheet.component.html',
  styleUrls: ['./dd-contact-sheet.component.scss', '../../family-preservation/family-preservation.scss']

})
export class DdContactSheetComponent implements OnInit {
  isPrint = true;

  //////////////////////////////////
  constructor(public _printPdf: PrintPdf, public _router: Router) { }


  ngOnInit() {
  }

  saveForm() {
    ////////////////////////////////////////////////////////////////////////
    this._router.navigate(["/reports/attachment-document/case-activity"]);
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
