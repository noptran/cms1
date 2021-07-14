import { Component, OnInit } from '@angular/core';
import html2pdf from 'html2pdf.js';
import {PrintPdf} from "../print-pdf";

@Component({
  selector: 'app-family-preservation-progress-note',
  templateUrl: './family-preservation-progress-note.component.html',
  styleUrls: ['./family-preservation-progress-note.component.scss']
})
export class FamilyPreservationProgressNoteComponent implements OnInit {

  constructor(public _printPdf: PrintPdf, ) { }

  ngOnInit() {
  }
  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }
}
