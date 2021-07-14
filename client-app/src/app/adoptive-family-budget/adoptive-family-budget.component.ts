import { Component, OnInit } from '@angular/core';
import html2pdf from 'html2pdf.js';
import {PrintPdf} from "../print-pdf";

@Component({
  selector: 'app-adoptive-family-budget',
  templateUrl: './adoptive-family-budget.component.html',
  styleUrls: ['./adoptive-family-budget.component.scss']
})
export class AdoptiveFamilyBudgetComponent implements OnInit {

  constructor(public _printPdf: PrintPdf, ) { }

  ngOnInit() {
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
