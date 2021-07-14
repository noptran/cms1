import { Component, OnInit } from '@angular/core';
import html2pdf from 'html2pdf.js';
import {PrintPdf} from '../../print-pdf';

@Component({
  selector: 'app-pps3049-a-intro-and-parents-guide',
  templateUrl: './pps3049-a-intro-and-parents-guide.component.html',
  styleUrls: ['./pps3049-a-intro-and-parents-guide.component.scss', '../family-preservation.scss']
})
export class Pps3049AIntroAndParentsGuideComponent implements OnInit {
  isPrint = true;

  constructor(public _printPdf: PrintPdf, ) { }

  ngOnInit() {
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
