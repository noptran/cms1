import { Component, OnInit } from '@angular/core';
import html2pdf from 'html2pdf.js';
import {PrintPdf} from "../print-pdf";

@Component({
  selector: 'app-adoption-after-care-summary',
  templateUrl: './adoption-after-care-summary.component.html',
  styleUrls: ['./adoption-after-care-summary.component.scss']
})
export class AdoptionAfterCareSummaryComponent implements OnInit {

  constructor(public _printPdf: PrintPdf) { }

  ngOnInit() {
  }
  summary_service(){
    let  textArea = document.getElementById("summary_service")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  siginificant_process(){
    let  textArea = document.getElementById("siginificant_process")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  anticipated_challenges(){
    let  textArea = document.getElementById("anticipated_challenges")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  Respite_support(){
    let  textArea = document.getElementById("Respite_support")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  mental_Health(){
    let  textArea = document.getElementById("mental_Health")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };

  printForm() {
    this._printPdf.fileName = 'Adoption Aftercare Summary and Plan';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

}
