import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import html2pdf from 'html2pdf.js';
import { Router } from '@angular/router';
import {PrintPdf} from '../../print-pdf';

@Component({
  selector: 'app-intro-and-parents-guide',
  templateUrl: './intro-and-parents-guide.component.html',
  styleUrls: ['./intro-and-parents-guide.component.scss', '../family-preservation.scss'],
  outputs: ['introParOut']
})
export class IntroAndParentsGuideComponent implements OnInit {
  isPrint = true;

  constructor(public _printPdf: PrintPdf, public _router: Router) { }

  @Output()
  introParOut = new EventEmitter();

  ngOnInit() {
  }

  saveForm() {

    this.introParOut.emit({});
    // this._router.navigate(["/reports/attachment-document/case-activity"]);
  }

  printForm() {
    this._printPdf.fileName = 'CMSForm';
    this._printPdf.htmlElementToBePrinted = 'form-content';
    this._printPdf.printForm();
  }

  discardForm() {
    this.introParOut.emit({ cmsData: {} });
  }


}
