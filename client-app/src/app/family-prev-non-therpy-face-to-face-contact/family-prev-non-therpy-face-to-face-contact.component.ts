import { Component, OnInit } from '@angular/core';
import html2pdf from 'html2pdf.js';
import {PrintPdf} from "../print-pdf";
@Component({
  selector: 'app-family-prev-non-therpy-face-to-face-contact',
  templateUrl: './family-prev-non-therpy-face-to-face-contact.component.html',
  styleUrls: ['./family-prev-non-therpy-face-to-face-contact.component.scss']
})
export class FamilyPrevNonTherpyFaceToFaceContactComponent implements OnInit {

  constructor(public _printPdf: PrintPdf, ) { }

  ngOnInit() {
  }
  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }
}
