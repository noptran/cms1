import { Component, OnInit } from '@angular/core';
import html2pdf from 'html2pdf.js';
import {PrintPdf} from "../print-pdf";
@Component({
  selector: 'app-social-history-for-children',
  templateUrl: './social-history-for-children.component.html',
  styleUrls: ['./social-history-for-children.component.scss']
})
export class SocialHistoryForChildrenComponent implements OnInit {

  constructor(public _printPdf: PrintPdf, ) { }

  ngOnInit() {
  }
  summary_service() {
    let textArea = document.getElementById("summary_service")
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  guardian_ad_Litem() {
    let textArea = document.getElementById("guardian_ad_Litem")
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  reasonForReferral() {
    let textArea = document.getElementById("reasonForReferral")
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  birthInfo() {
    let textArea = document.getElementById("birthInfo")
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  resultsOfmate() {
    let textArea = document.getElementById("resultsOfmate")
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  indianChaildWalfre() {
    let textArea = document.getElementById("indianChaildWalfre")
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  sibiling() {
    let textArea = document.getElementById("indianChaildWalfre")
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  social() {
    let textArea = document.getElementById("social")
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  birthFamily() {
    let textArea = document.getElementById("birthFamily")
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  earlyDevelopment() {
    let textArea = document.getElementById("earlyDevelopment")
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  medicalInfo() {
    let textArea = document.getElementById("medicalInfo")
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  sexualInfo() {
    let textArea = document.getElementById("sexualInfo")
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
  schoolInfo() {
    let textArea = document.getElementById("schoolInfo")
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
  relationShip() {
    let textArea = document.getElementById("relationShip")
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
  relationShipout() {
    let textArea = document.getElementById("relationShipout")
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  };
  agencg() {
    let textArea = document.getElementById("agencg")
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
