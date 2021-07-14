import { Injectable } from '@angular/core';
import html2pdf from 'html2pdf.js';

/** PDF Print related functionalitiies in the application are used here*/

@Injectable()

export class PrintPdf {
  fileName = 'cms form';
  htmlElementToBePrinted = 'print-content';
  imageType = 'jpeg';
  imageQuality = 1;
  htmlToCanvasScale = 1;
  jsPdfUnit = 'in';
  jsPdfFormat = 'a3';
  jsPdfOrientation = 'portrait';
  pageBreakMode = 'avoid-all';
  pageBreakBefore = '#page2el';
  margin = 1;

  printForm() {
    const element = document.getElementById(this.htmlElementToBePrinted);
    const opt = {
      margin: this.margin,
      filename: this.fileName,
      image: { type: this.imageType, quality: this.imageQuality },
      html2canvas: { scale: this.htmlToCanvasScale },
      jsPDF: { unit: this.jsPdfUnit, format: this.jsPdfFormat, orientation: 'portrait' },
      pagebreak: { mode: this.pageBreakMode, before: this.pageBreakBefore }
    };
    html2pdf().from(element).set(opt).save();
  }

}
