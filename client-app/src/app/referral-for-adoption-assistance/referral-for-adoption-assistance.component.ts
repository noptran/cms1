import { Component, OnInit } from '@angular/core';
import html2pdf from 'html2pdf.js';
import {PrintPdf} from "../print-pdf";

@Component({
  selector: 'app-referral-for-adoption-assistance',
  templateUrl: './referral-for-adoption-assistance.component.html',
  styleUrls: ['./referral-for-adoption-assistance.component.scss']
})
export class ReferralForAdoptionAssistanceComponent implements OnInit {

  constructor(public _printPdf: PrintPdf, ) { }

  ngOnInit() {
  }
  summary_service() {
    let textArea = document.getElementById("summary_service")
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }
}
